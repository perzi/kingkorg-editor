
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

    return {
      id: id,
      name: name,
      min: min,
      max: max,
      values: values
    };

  },

  parseValueString: function(s, refs) {

    let ref = s.match(/\*T\d+\-\d+/);
    let hasRef = ref && ref.length > 0;

    if (hasRef) {
      return refs[ref];
    }

    let trimmed = this.trim(s);
    let splitted = trimmed.split(":");
    let valueParts = splitted[0].split(",");
    let textParts = splitted[splitted.length - 1].split(",");
    let values = [];
    let texts = [];
    let rangeReg = /[\-\d]+(?:~[\-\d]+)+/
    let valuesHash = {};
    var min = 0;
    var max = 0;
    var i;

    valueParts.forEach(function(valuePart) {

      let range = valuePart.match(rangeReg);

      if (range) {
        // explode range
        let rangeParts = range[0].split("~");
        let minValue = parseInt(rangeParts[0], 10);
        var maxValue = 127
        if (rangeParts.length > 1) {
          maxValue = parseInt(rangeParts[rangeParts.length - 1], 10);
        }

        if (min !== null) {
          min = Math.min(min, minValue);
        } else {
          min = minValue;
        }
        if (max !== null) {
          max = Math.max(max, maxValue);
        } else {
          max = maxValue;
        }

        for (i = minValue; i <= maxValue; i++) {
          values.push(i);
        }
      } else {
        values.push(parseInt(valuePart, 10));
      }
    });

    textParts.forEach(function(textPart) {

      let range = textPart.match(rangeReg);

      if (range) {
        // explode range
        let rangeParts = range[0].split("~");
        let minValue = parseInt(rangeParts[0], 10);
        var maxValue = 127
        if (rangeParts.length > 1) {
          maxValue = parseInt(rangeParts[rangeParts.length - 1], 10);
        }

        for (i = minValue; i <= maxValue; i++) {
          texts.push(textPart.replace(rangeReg, i));
        }
      } else {
          texts.push(textPart);
      }
    });

    values.forEach(function(value, index) {
      valuesHash[value] = texts[index];
    });

    return {
      id: s,
      name: s,
      min: min,
      max: max,
      values: valuesHash
    };
  }
};

export default parser;
