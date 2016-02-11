export function splitIntIn7BitsValues(value) {
  // returns an array with value split into 7 bit values
  // least significant first

  let output = [];

  while (value > 0) {
    output.push(value & 127);
    value = value >> 7;
  }

  return output;
}

export function convert7BitDataToBytes(sourceData) {
  // converts an array of 7bit data to bytes
  // first 7bit value vill include the 8th bit for the following
  // 7 bytes

  let data = [];

  sourceData.forEach((x, i) => {
    let r = i % 8; // get order of item
    if (r !== 0) {
      let highbitIndex = Math.floor(i / 8) * 8;
      let highbits = sourceData[highbitIndex];
      let highbit = (highbits << (8 - r)) & 0b10000000;
      let value = highbit | x;

      data.push(value);
    }
  });

  return data;
}

export function convertBytesTo7BitData(sourceData) {
  // converts an array of bytes to 7bit data
  // first 7bit value vill include the 8th bit for the following
  // 7 bytes

  let data = [];
  let highbits = 0;
  let highbitIndex = 0;

  sourceData.forEach((x, i) => {
    let r = (i % 7); // get order of item

    if (r === 0) {
      // reset value
      data.push(0);
      highbitIndex = data.length - 1;
    }

    // get highestbit and shift it
    let highbit = (x & 0b10000000) >> (7 - r);
    let lower   = (x & 0b01111111);

    data[highbitIndex] = data[highbitIndex] | highbit;
    data.push(lower);
  });

  return data;
}
