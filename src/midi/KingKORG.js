import { convert7BitDataToBytes, convertBytesTo7BitData, splitIntIn7BitsValues } from 'util/midi-helpers'


const KK_IN_MIDI    = "KingKORG MIDI IN";
const KK_IN_KBD     = "KingKORG KBD/KNOB";
const KK_OUT_MIDI   = "KingKORG MIDI OUT";
const KK_OUT_SOUND  = "KingKORG SOUND";


const SYSEX = 0xF0;
const EOX = 0xF7;
const INTERNAL_CLOCK = 0xF8;

const KK_DEVICE_INQUIRY = Symbol("DEVICE INQUIRY");
const KK_DEVICE_SEARCH = Symbol("DEVICE SEARCH");
const KK_EXCLUSIVE_MESSAGE = Symbol("SYSTEM EXCLUSIVE MESSAGES");

// Requests
const CURRENT_PROGRAM_DATA_DUMP_REQUEST = 0x10;
const PROGRAM_DATA_DUMP_REQUEST         = 0x1C;
const GLOBAL_DATA_DUMP_REQUEST          = 0x0E;
const PROGRAM_WRITE_REQUEST             = 0x11;
const PROGRAM_PARAMETER_CHANGE          = 0x41;

// Replies
export const CURRENT_PROGRAM_DATA_DUMP  = 0x40;
export const PROGRAM_DATA_DUMP          = 0x4C;
export const GLOBAL_DATA_DUMP           = 0x51;

// Respsonse result
export const DATA_FORMAT_ERROR          = 0x26;
export const DATA_LOAD_COMPLETED        = 0x23;
export const DATA_LOAD_ERROR            = 0x24;
export const WRITE_COMPLETED            = 0x21;
export const WRITE_ERROR                = 0x22;


function intArrayToHexString(data) {
  let hexData = data.map((value) => {
    return (value < 16 ? "0" : "") + value.toString(16);
  });
  return hexData;
}

const messageDefinitions = [
  {
    id: KK_DEVICE_INQUIRY,
    createRequest: (channel = 0x7F) => {
      // channel can be 0...F or 7F for any channel

      return [SYSEX, 0x7E, channel, 0x06, 0x01, EOX];
    },
    replySignature: [SYSEX, 0x7e, undefined, 0x06, 0x02, 0x42, 0x18, 0x01, 0x01, 0x00],
    parseReply: () => {
      return [];
    }
  },
  {
    id: KK_DEVICE_SEARCH,
    createRequest: (echoBackId) => {
      // echoBackId must be 0...127

      return [SYSEX, 0x42, 0x50, 0x00, echoBackId, EOX];
    },
    replySignature: [SYSEX, 0x42, 0x50, 0x01, undefined, undefined, 0x18, 0x01, 0x01, 0x00],
    parseReply: () => {
      return [];
    }
  },
  {
    id: KK_EXCLUSIVE_MESSAGE,
    createRequest: (midiChannel, command, data = []) => {
      let channel = 0x30 + midiChannel;
      return [SYSEX, 0x42, channel, 0x00, 0x01, 0x18, command, ...data, EOX];
    },
    replySignature: [SYSEX, 0x42, undefined, 0x00, 0x01, 0x18, undefined],
    parseReply: () => {
      return [];
    }
  }
];




function Uint8ArrToArray(Uint8Arr) {
  let data = [];
  for (let i = 0; i < Uint8Arr.length; i++) {
    data.push(Uint8Arr[i]);
  }
  return data;
}

function arrayStartsWithSignature(arr, signature) {
  // returns true if an array starts with a signature
  // undefined in signature will be considered a match

  return signature.every((item, index) => {
    return (item === undefined) || item === arr[index];
  });
}

function getResponseVariables(data, signature) {
  // Remove constants from data and return a new
  // array with only the values from data where
  // the signature has undefined values at the
  // corresponding index

  return data.filter((item, index) => {
    return signature[index] === undefined;
  });
}



/*
  Helper class to connect to KingKORG device
*/

export default class KingKORG {

  constructor(onChange, onMidi, onKbd, onSysex, onDeviceInquiry, onDeviceSearch) {
    this.onChange = onChange;
    this.onMidi = onMidi;
    this.onKbd = onKbd;
    this.onSysex = onSysex;
    this.onDeviceInquiry = onDeviceInquiry;
    this.onDeviceSearch = onDeviceSearch;

    this.state = {
      scanned: false,
      devicePresent: false,
      canConnect: false, // user granted access
      midiAvailable: false,

      midiAccess: null,
      midiIn: null,
      midiKbd: null,
      midiOut: null,
      midiSound: null,
      midiChannel: 0, // default to 1

      kingKorgConnected: false,
    }
  }

  destroy() {
    // TODO: teardown
    if (this.state.midiIn) {
      this.state.midiIn.close();
    }
    if (this.state.midiKbd) {

    }
    if (this.state.midiAccess) {

    }
  }

  setState(changedState) {
    let oldState = this.state;
    let newState = Object.assign({}, this.state, changedState);
    this.state = newState;

    console.log("KKMIDI", newState, oldState);

    this.onChange(newState, oldState);
  }

  scanForDevice() {
    if (navigator.requestMIDIAccess) {
      // Scan without sysex to see if any KK device is available
      navigator.requestMIDIAccess().then(
        (midiAccess) => {
          this.setState({ scanned: true, midiAvailable: true });
          this.scanForKingKorg(midiAccess);
        },
        () => {
          // TODO: set error state, we have no midi access
          //this.setState({ scanned: false })
        }
      );
    } else {
      this.setState({ midiAvailable: false });
    }
  }

  scanForKingKorg(midiAccess) {
    // loop through inputs to to find

    let foundInput = false;
    let foundOutput = false;

    midiAccess.inputs.forEach((item) => {
      foundInput = foundInput || (item.name === KK_IN_MIDI) || (item.name === KK_IN_KBD)
    });
    midiAccess.outputs.forEach((item) => {
      foundOutput = foundOutput || (item.name === KK_OUT_MIDI) || (item.name === KK_OUT_SOUND)
    });

    this.setState({ devicePresent: (foundInput && foundOutput) });
  }

  connectToKingKorg() {
    navigator.requestMIDIAccess({ sysex: true }).then(
      (midiAccess) => {
        this.setState({
          midiAccess: midiAccess,
          canConnect: true
        });

        this.openKingKorgConnections();
      },
      () => {
        this.setState({
          canConnect: false
        });
      }
    );
  }

  openKingKorgConnections() {
    this.state.midiAccess.inputs.forEach((input) => {
      if (input.name === KK_IN_MIDI) {

        input.open().then(() => {

          let inputConnection = input;

          this.setState({
            midiIn: inputConnection,
            kingKorgConnected: true
          });

          inputConnection.onmidimessage = this.onMidiMessage.bind(this);
          inputConnection.onstatechange = () => {
            console.log("MIDI STATE CHANGE", inputConnection);
          };
        });
      }
      if (input.name === KK_IN_KBD) {
        input.open().then(() => {

          let inputConnection = input;

          this.setState({
            midiKbd: inputConnection,
            kingKorgConnected: true
          });

          input.onmidimessage = this.onKbdMessage.bind(this);
          inputConnection.onstatechange = () => {
            console.log("MIDI STATE CHANGE", inputConnection);
          };
        });
      }
    });

    this.state.midiAccess.outputs.forEach((output) => {
      if (output.name === KK_OUT_MIDI) {

        output.open().then(() => {

          let outputConnection = output;

          this.setState({
            midiOut: outputConnection,
            kingKorgConnected: true
          });

          outputConnection.onstatechange = () => {
            console.log("MIDI STATE CHANGE", outputConnection);
          };
        });
      }
      if (output.name === KK_OUT_SOUND) {
        output.open().then(() => {

          let outputConnection = output;

          this.setState({
            midiSound: outputConnection,
            kingKorgConnected: true
          });

          outputConnection.onstatechange = () => {
            console.log("MIDI STATE CHANGE", outputConnection);
          };
        });
      }
    });
  }

  onMidiMessage(evt) {

    // TODO: parse message
    let data = Uint8ArrToArray(evt.data);

    this.onMidi(evt);
  }

  onKbdMessage(evt) {
    // TODO: don't convert data at all? unless we need to map?
    let data = Uint8ArrToArray(evt.data);

    // Exit if message is internal clock
    if (data[0] === INTERNAL_CLOCK) {
      return;
    }

    let hexData = data.map((value) => {
      return (value < 16 ? "0" : "") + value.toString(16);
    });
    console.log("KBD DATA");
    console.log(hexData.join(" "));

    // Is Sysex message?
    if (data[0] === SYSEX && data[data.length - 1] === EOX) {
      // remove last item
      data.pop();
      this.parseKbdData(data);
    }


    this.onKbd({
      data: data
    });
  }

  parseKbdData(data) {
    messageDefinitions.forEach((def) => {
      if (arrayStartsWithSignature(data, def.replySignature)) {
        let replyVariables = getResponseVariables(data, def.replySignature);
        let channel, globalChannel, echoBackId, majorVersion, minorVersion, releaseVersion, reserved, sysexEnabled, responseData, command;

        switch (def.id) {
          case KK_DEVICE_INQUIRY:
            console.log(KK_DEVICE_INQUIRY);
            [channel, majorVersion, minorVersion, releaseVersion, reserved] = replyVariables;
            globalChannel = channel & 0x0F;
            this.onDeviceInquiry(globalChannel, majorVersion, minorVersion, releaseVersion);
            break;

          case KK_DEVICE_SEARCH:
            console.log(KK_DEVICE_SEARCH);
            [channel, echoBackId, majorVersion, minorVersion, releaseVersion, reserved] = replyVariables;

            globalChannel = channel & 0x0F;
            sysexEnabled = channel & 0b10000;
            this.onDeviceSearch(globalChannel, sysexEnabled, echoBackId, majorVersion, minorVersion, releaseVersion);
            break;

          case KK_EXCLUSIVE_MESSAGE:
            console.log(KK_EXCLUSIVE_MESSAGE);
            [channel, command, ...responseData] = replyVariables;
            globalChannel = channel & 0x0F;

            // TODO: parse responseData differently depending on command
            this.handleExclusiveMessage(channel, command, responseData);
            break;

          default:
            break;
        }
      }
    });
  }

  handleExclusiveMessage(channel, command, responseData) {

    let data = responseData;
    let evt = {
      command,
      channel: channel & 0x0f
    };

    if (command === CURRENT_PROGRAM_DATA_DUMP || command === GLOBAL_DATA_DUMP) {
      evt["data"] = convert7BitDataToBytes(responseData);
    }

    if (command === PROGRAM_DATA_DUMP) {
        let [programNoLsb, programNoMsb, programData] = responseData;
        evt["programNo"] = programNoMsb << 7 + programNoLsb;
        evt["data"] = convert7BitDataToBytes(programData);
    }

    this.onSysex(evt);
  }

  deviceInquiry(channel) {
    if (this.state.midiSound) {
      // TODO: get messageDefinition by symbol instead
      let request = messageDefinitions[0].createRequest(channel);
      this.state.midiSound.send(request);
    } else {
      // TODO: throw error?
    }
  }

  searchForDevice(echoBackId) {
    if (this.state.midiSound) {
      // TODO: get messageDefinition by symbol instead
      let request = messageDefinitions[1].createRequest(echoBackId);
      this.state.midiSound.send(request);
    } else {
      // TODO: throw error?
    }
  }

  exclusiveMessage(channel, command, data) {
    if (this.state.midiSound) {
      // TODO: get messageDefinition by symbol instead
      let request = messageDefinitions[2].createRequest(channel, command, data);
      this.state.midiSound.send(request);
    } else {
      // TODO: throw error?
    }
  }

  currentProgramDataDump(channel) {
    this.exclusiveMessage(channel, CURRENT_PROGRAM_DATA_DUMP_REQUEST);
  }

  programDataDump(channel, programNumber) {
    let [pLsb = 0, pMsb = 0] = splitIntIn7BitsValues(programNumber);

    this.exclusiveMessage(channel, PROGRAM_DATA_DUMP_REQUEST, [pLsb, pMsb]);
  }

  globalDataDump(channel) {
    this.exclusiveMessage(channel, GLOBAL_DATA_DUMP_REQUEST);
  }

  programWrite(channel, programNumber) {
    let [pLsb = 0, pMsb = 0] = splitIntIn7BitsValues(programNumber);

    this.exclusiveMessage(channel, PROGRAM_DATA_DUMP_REQUEST, [pLsb, pMsb]);
  }

  parameterChange(channel, parameterId, parameterSubId, value) {
    let [pLsb = 0, pMsb = 0] = splitIntIn7BitsValues(parameterId);
    let [sLsb = 0, sMsb = 0] = splitIntIn7BitsValues(parameterSubId);
    let [vvl = 0, vvm = 0, vvh = 0] = splitIntIn7BitsValues(value);

    this.exclusiveMessage(channel, PROGRAM_PARAMETER_CHANGE, [pLsb, pMsb, sLsb, sMsb, vvl, vvm, vvh]);
  }

}
