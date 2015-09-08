class Parameter {
  constructor(config) {
    this.number = config.number;
    this.name = config.name;
    this.title = config.title;
    this.lookup = config.lookup;
    this.id = config.id;
    this.subId = config.subId;
    this.midiId = config.midiId;
    this.min = 0;
    this.max = 0;
    this.isGroup = false;

  }

  getValueAsText(programData) {
    let value = programData[this.number];

    if (typeof this.lookup === "object") {
      return this.lookup[value];
    }
    if (typeof this.lookup === "function") {
      return this.lookup(value, programData);
    }
    return value;
  }
}


let programParameters = [
//
// | 0~11      | program name      | ASCII code [0]~[11]:Head~Tail        | 00:00~0B |
// +-----------+-------------------+--------------------------------------+----------+
// | 12        | category          | 0~8:Synth~User                *T01-1 | 00:0C    |
// +-----------+-------------------+--------------------------------------+----------+
// | 13        | Voice Mode        | 0~2:Single,Layer,Split               | 00:0D    |
// +-----------+-------------------+--------------------------------------+----------+
// | 14        | TimbreB MIDI Ch.  | 0~15,16~:1~16,Global                 | 00:0E    |
// +-----------+-------------------+--------------------------------------+----------+
// | 15        | Split Key         | 0~127:C-1~G9                         | 00:0F    |
//
];

export default programParameters;
