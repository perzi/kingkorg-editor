import {expect} from "chai";
import parser, { parseValueDefinition } from "../../src/data/parser";


describe("parser", () => {

  describe ("parseValueDefinition", () => {

    // raw value
    it("parses 0~2", () => {
      let s = "0~2";
      let result = parseValueDefinition(s);

      expect(result).to.deep.equal({
        id: s,
        min: 0,
        max: 2,
        type: "",
        mappings: [
          { value: 0, text: "0" },
          { value: 1, text: "1" },
          { value: 2, text: "2" },
        ]
      });
    });

    it("parses -2~0~2", () => {
      let s = "-2~0~2";
      let result = parseValueDefinition(s);

      expect(result).to.deep.equal({
        id: s,
        min: -2,
        max: 2,
        center: 0,
        type: "",
        mappings: [
          { value: -2, text: "-2" },
          { value: -1, text: "-1" },
          { value:  0, text: "0" },
          { value:  1, text: "1" },
          { value:  2, text: "2" },
        ]
      });
    });

    it("parses 0~300", () => {
      let s = "0~300";
      let result = parseValueDefinition(s);

      expect(result).to.deep.equal({
        id: s,
        min: 0,
        max: 300,
        type: "",
      });
    });

    it("parses -2~0~2[note]", () => {
      let s = "-2~0~2[note]";
      let result = parseValueDefinition(s);

      expect(result).to.deep.equal({
        id: s,
        min: -2,
        max: 2,
        center: 0,
        type: "[note]",
        mappings: [
          { value: -2, text: "-2[note]" },
          { value: -1, text: "-1[note]" },
          { value:  0, text: "0[note]" },
          { value:  1, text: "1[note]" },
          { value:  2, text: "2[note]" },
        ]
      });
    });

    // range to range
    it("parses 0~2~4:-2~0~2", () => {
      let s = "0~2~4:-2~0~2";
      let result = parseValueDefinition(s);

      expect(result).to.deep.equal({
        id: s,
        min: 0,
        max: 4,
        center: 2,
        type: "",
        mappings: [
          { value: 0, text: "-2" },
          { value: 1, text: "-1" },
          { value: 2, text: "0" },
          { value: 3, text: "1" },
          { value: 4, text: "2" }
        ]
      });
    });

    // // range to range
    // it("parses 0~2~4:L2~CNT~R2", () => {
    //   let s = "0~2~4:L2~CNT~R2";
    //   let result = parseValueDefinition(s);
    //
    //   expect(result).to.deep.equal({
    //     id: s,
    //     min: 0,
    //     max: 4,
    //     center: 2,
    //     type: "",
    //     mappings: [
    //       { value: 0, text: "L2" },
    //       { value: 1, text: "L1" },
    //       { value: 2, text: "CNT" },
    //       { value: 3, text: "R1" },
    //       { value: 4, text: "R2" }
    //     ]
    //   });
    // });

    // range to range with formatting
    it("parses 1~4:1~4 Octave", () => {
      let s = "1~4:1~4 Octave";
      let result = parseValueDefinition(s);

      expect(result).to.deep.equal({
        id: s,
        min: 1,
        max: 4,
        type: " Octave",
        mappings: [
          { value: 1, text: "1 Octave" },
          { value: 2, text: "2 Octave" },
          { value: 3, text: "3 Octave" },
          { value: 4, text: "4 Octave" }
        ]

      });
    });

    it("parses 0,1~3:OFF,2~4Voice", () => {
      let s = "0,1~3:OFF,2~4Voice";
      let result = parseValueDefinition(s);

      expect(result).to.deep.equal({
        id: s,
        min: 0,
        max: 3,
        type: "Voice",
        mappings: [
          { value: 0, text: "OFF" },
          { value: 1, text: "2Voice" },
          { value: 2, text: "3Voice" },
          { value: 3, text: "4Voice" }
        ]
      });
    });

    it("parses 0~2,3:0~2,Hold", () => {
      let s = "0~2,3:0~2,Hold";
      let result = parseValueDefinition(s);

      expect(result).to.deep.equal({
        id: s,
        min: 0,
        max: 3,
        type: "",
        mappings: [
          { value: 0, text: "0" },
          { value: 1, text: "1" },
          { value: 2, text: "2" },
          { value: 3, text: "Hold" }
        ]
      });
    });

    // Simple mapping
    it("parses 0,1:Off,On", () => {
      let s = "0,1:Off,On";
      let result = parseValueDefinition(s);

      expect(result).to.deep.equal({
        id: s,
        min: 0,
        max: 1,
        mappings: [
          { value: 0, text: "Off" },
          { value: 1, text: "On" }
        ],
        type: ""
      });
    });

    // range with mapping
    it("parses 0~2:Off,Timbre,Voice", () => {
      let s = "0~2:Off,Timbre,Voice";
      let result = parseValueDefinition(s);

      expect(result).to.deep.equal({
        id: s,
        min: 0,
        max: 2,
        type: "",
        mappings: [
          { value: 0, text: "Off" },
          { value: 1, text: "Timbre" },
          { value: 2, text: "Voice" }
        ]
      });
    });
  });

});
