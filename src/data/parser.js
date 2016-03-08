
const valueReg = /\s{2,}/g;
const rangeReg = /\D*[\-\d]+\D*(?:~\D*[\-\d]+\D*)+/;
const formatReg = /^(\D*)(\d+)(\D*)$/;
const FORMAT_VALUE = "{{value}}";
const SEPARATOR_RANGE = "~";
const SEPARATOR_LIST = ",";
const SEPARATOR_VALUESTEXT = ":";

const REG_RANGE_VALUE = /^(-?\d+)~(\d+)(\D*)$/;
const REG_RANGE_WITH_CENTER_VALUE = /^([^-\d]*)(-?\d+)(\D*)~(\D*)(\d*)(\D*)~(\D*)(\d+)(\D*)$/;



function trim(s) {
  if (s) {
    return s.replace(/^\s*|\s*$/g, "");
  } else {
    return "";
  }
}

function getMin(a, b) {
  if (a !== null && a !== undefined) {
    return Math.min(a, b);
  } else {
    return b;
  }
};

function getMax(a, b) {
  if (a !== null && a !== undefined) {
    return Math.max(a, b);
  } else {
    return b;
  }
}


export function parseValueTable(s) {
  let pairs = s.split(valueReg);
  let firstRow = pairs[0].split(SEPARATOR_VALUESTEXT);
  let mappings = [];
  let min = null;
  let max = null;

  let id = trim(firstRow[0]);
  let name = trim(firstRow[1]);

  for (let i = 1; i < pairs.length; i++) {
    let pair = pairs[i].split(SEPARATOR_VALUESTEXT);
    let value = trim(pair[0]);
    let text = trim(pair[1]);
    let intValue = parseInt(value, 10);

    min = getMin(min, intValue);
    max = getMax(max, intValue);

    mappings.push({
      value: intValue,
      text,
    });
  }

  mappings.sort((a, b) => a.value < b.value ? -1 : 1);

  return {
    id: id,
    name: name,
    min: min,
    max: max,
    type: "",
    mappings: mappings
  };
}

export function getRef(valueString) {
  let ref = valueString.match(/\*T\d+\-\d+/);
  return ref;
}

export function getValuesFromRefs(valueString, refs) {
  let ref = getRef(valueString);
  let hasRef = ref && ref.length > 0;

  if (hasRef) {
    return refs[ref];
  } else {
    return null;
  }
}

function createFormatString(before, after, defaultFormat) {
  if (before.length > 0 || after.length > 0) {
    return `${before}${FORMAT_VALUE}${after}`;
  } else {
    return defaultFormat;
  }

}

function isRange(s) {
  return REG_RANGE_VALUE.test(s) || REG_RANGE_WITH_CENTER_VALUE.test(s);
}

function parseRange(range) {
  if (REG_RANGE_VALUE.test(range)) {

    let match = range.match(REG_RANGE_VALUE);
    let [, min, max, type] = match;

    return {
      min: parseInt(min, 10),
      max: parseInt(max, 10),
      type
    }

  } else if (REG_RANGE_WITH_CENTER_VALUE.test(range)) {
    let match = range.match(REG_RANGE_WITH_CENTER_VALUE);
    let [, minFB, min, minFA, centerFB, center, centerFA, maxFB, max, maxFA] = match;
    let type = maxFA;

    // Assume format to be after max
    let maxFormat = createFormatString(maxFB, maxFA, "");
    let minFormat = createFormatString(minFB, minFA, maxFormat);
    let centerFormat = createFormatString(centerFB, centerFA, maxFormat);

    console.log(range, minFormat, centerFormat, maxFormat);

    return {
      min: parseInt(min, 10),
      center: parseInt(center, 10),
      max: parseInt(max, 10),
      // minFormat,
      // centerFormat,
      // maxFormat,
      type,
    }

  } else {
    debugger;
    console.error("Unparsable range", range);
    return {
      text: range
    }
  }
}


export function parseValueDefinition(s) {
  let trimmed = s.trim();
  let simpleRange = trimmed.indexOf(SEPARATOR_VALUESTEXT) === -1;

  if (simpleRange) {
    // Should have a range only
    let lookup = parseRange(trimmed);
    let mappings = [];
    let length = lookup.max - lookup.min;
    // explode range if range is max 128 values
    if (length <= 128) {
      for (let i = lookup.min; i <= lookup.max; i++) {
        mappings.push({
          value: i,
          text: i.toString(10) + lookup.type
        })
      }
      lookup.mappings = mappings;
    }

    lookup.id = s;

    return lookup;
  } else {
    let [values, mappings] = trimmed.split(SEPARATOR_VALUESTEXT);
    let valueMappings = [];
    let min;
    let max;
    let center;
    let type = "";

    values = values.split(SEPARATOR_LIST);
    mappings = mappings.split(SEPARATOR_LIST);

    if (values.length === mappings.length) {
      for (let i = 0; i < values.length; i++) {
        let value = values[i];
        let mapping = mappings[i];
        let valueIsRange = isRange(value)
        let mappingIsRange = isRange(mapping);

        if (valueIsRange && mappingIsRange) {

          let valueRange = parseRange(value);
          let mappingRange = parseRange(mapping);

          // explode ranges
          for (let i = 0; i <= valueRange.max - valueRange.min; i++) {
            let value = valueRange.min + i;
            let mapping = (mappingRange.min + i) + mappingRange.type;

            type = mappingRange.type;

            min = getMin(min, value);
            max = getMax(max, value);
            if ("center" in valueRange) center = valueRange.center;

            // 1 to 1 mapping
            valueMappings.push({
              value: value,
              text: mapping
            });
          }
        } else {

          let intValue = parseInt(value, 10);
          min = getMin(min, intValue);
          max = getMax(max, intValue);

          // 1 to 1 mapping
          valueMappings.push({
            value: intValue,
            text: mapping
          });
        }
      }


    } else if (values.length === 1) {
      // value must be a range has to be a range

      let valueRange = parseRange(values[0]);
      for (let i = 0; i <= valueRange.max - valueRange.min; i++) {
        valueMappings.push({
          value: i + valueRange.min,
          text: mappings[i]
        });
      }

      min = valueRange.min;
      max = valueRange.max;
      center = valueRange.center;
    } else {
      console.error("Can't parse values", s);
    }

    // sort by value
    valueMappings.sort((a, b) => a.value < b.value ? -1 : 1);

    let retVal = {
      id: s,
      min: min,
      max: max,
      type: type,
      mappings: valueMappings
    };

    if (center !== undefined) retVal.center = center;

    return retVal;
  }
}
