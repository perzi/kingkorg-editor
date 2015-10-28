
let parser = {
  valueReg: /\s{2,}/g,

  trim: function(s) {
    if (s) {
      return s.replace(/^\s*|\s*$/g, "");
    } else {
      return "";
    }
  },

  parseValueTable: function(s) {

    let pairs = s.split(this.valueReg);
    let firstRow = pairs[0].split(":");
    let values = {};
    let min = null;
    let max = null;

    let id = this.trim(firstRow[0]);
    let name = this.trim(firstRow[1]);

    for (let i = 1; i < pairs.length; i++) {
      let pair = pairs[i].split(":");
      let value = this.trim(pair[0]);
      let text = this.trim(pair[1]);
      let intValue = parseInt(value, 10);

      if (min !== null) {
        min = Math.min(min, intValue);
      } else {
        min = intValue;
      }

      if (max !== null) {
        max = Math.max(max, intValue);
      } else {
        max = intValue;
      }

      values[intValue.toString()] = text;
    }

    console.log(id, name, min, max);
    console.log(values);

    return {
      id: id,
      name: name,
      min: min,
      max: max,
      values: values
    };

  }
};

export default parser;
