import React from 'react';
import { Panel, Grid, Row, Col } from 'react-bootstrap';

import Osc     from 'components/program/Osc';
import Control from 'components/program/Control';
import EG      from 'components/program/EG';
import LFO     from 'components/program/LFO';
import { getControlParameter } from 'util/component-helpers';

import 'styles/components/program/timbre';


class Timbre extends React.Component {
  constructor(props) {
    super(props);
  }

  getOscParameter(id) {
    let parameter = this.props.parameter.getParameter(id);
    return {
      title: parameter.name,
      parameter: parameter,
      offset: parameter.getOffset(),
      data: this.props.data,
      onChange: this.props.onChange
    };
  }

  render() {
    let props = this.props;
    let { disabled } = props;
    return (
      <Panel collapsible defaultExpanded header={props.parameter.name}>
         <Grid fluid={true}>
          <Row className="show-grid">
            <Col lg={6} md={6} sm={6} xs={6} >
              <div className="timbre">
                <div className="timbre__blocks">
                  <div className="timbre__block">
                    <h4 className="timbre__block-title">EG 1 (Filter)</h4>
                    <EG disabled={disabled} {...getControlParameter(props, "eg_1")} />
                  </div>
                  <div className="timbre__block">
                    <h4 className="timbre__block-title">EG 2 (Amp)</h4>
                    <EG disabled={disabled} {...getControlParameter(props, "eg_2")} />
                  </div>
                  <div className="timbre__block">
                    <h4 className="timbre__block-title">Oscillator 1</h4>
                    <Osc {...this.getOscParameter("osc_1")} />
                  </div>
                  <div className="timbre__block">
                    <h4 className="timbre__block-title">Oscillator 2</h4>
                    <Osc {...this.getOscParameter("osc_2")} />
                  </div>
                  <div className="timbre__block">
                    <h4 className="timbre__block-title">Oscillator 3</h4>
                    <Osc {...this.getOscParameter("osc_3")} />
                  </div>
                  <div className="timbre__block">
                    <h4 className="timbre__block-title">LFO 1</h4>
                    <LFO disabled={disabled} {...getControlParameter(props, "lfo_1")} />
                  </div>
                  <div className="timbre__block">
                    <h4 className="timbre__block-title">LFO 2</h4>
                    <LFO disabled={disabled} {...getControlParameter(props, "lfo_2")} />
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={6} md={6} sm={6} xs={6} >
              <div className="timbre">
                <div className="timbre__blocks">
                  <div className="timbre__block">
                    <h4 className="timbre__block-title">Voice</h4>
                    <Control disabled={disabled} {...getControlParameter(props, "voice_assign", "pushbuttons", "")} />
                    <Control disabled={disabled} {...getControlParameter(props, "unison_sw", "pushbuttons", "")} />
                    <Control disabled={disabled} {...getControlParameter(props, "unison_detune", "slider", "", "unison_sw")} />
                    <Control disabled={disabled} {...getControlParameter(props, "unison_spread", "slider", "", "unison_sw")} />
                  </div>
                  <div className="timbre__block">
                    <h4 className="timbre__block-title">Pitch</h4>
                    <Control disabled={disabled} {...getControlParameter(props, "pitch_transpose", "slider", "")} />
                    <Control disabled={disabled} {...getControlParameter(props, "pitch_detune", "slider", "")} />
                    <Control disabled={disabled} {...getControlParameter(props, "pitch_lfo2modint", "slider", "")} />
                    <Control disabled={disabled} {...getControlParameter(props, "pitch_lfo2jsy", "slider", "")} />
                    <Control disabled={disabled} {...getControlParameter(props, "pitch_bendrange", "slider", "")} />
                    <Control disabled={disabled} {...getControlParameter(props, "pitch_portamento_sw", "toggle")} />
                    <Control disabled={disabled} {...getControlParameter(props, "pitch_portamento_time", "slider", "")} />
                    <Control disabled={disabled} {...getControlParameter(props, "pitch_analog_tuning", "slider", "")} />
                  </div>
                  <div className="timbre__block">
                    <h4 className="timbre__block-title">Filter</h4>
                    <Control disabled={disabled} {...getControlParameter(props, "type")} />
                    <Control disabled={disabled} {...getControlParameter(props, "cutoff", "slider", "")} />
                    <Control disabled={disabled} {...getControlParameter(props, "resonance", "slider", "")} />
                    <Control disabled={disabled} {...getControlParameter(props, "eg1_intensity", "slider", "")} />
                    <Control disabled={disabled} {...getControlParameter(props, "lfo1_mod_int", "slider", "")} />
                    <Control disabled={disabled} {...getControlParameter(props, "lfo1_js-y", "slider", "")} />
                    <Control disabled={disabled} {...getControlParameter(props, "keyboard_track", "slider", "")} />
                    <Control disabled={disabled} {...getControlParameter(props, "velocity_sens", "slider", "")} />
                  </div>
                  <div className="timbre__block">
                    <h4 className="timbre__block-title">Mixer</h4>
                    <Control disabled={disabled} {...getControlParameter(props, "osc1_level", "slider", "")} />
                    <Control disabled={disabled} {...getControlParameter(props, "osc2_level", "slider", "")} />
                    <Control disabled={disabled} {...getControlParameter(props, "osc3_level", "slider", "")} />
                  </div>
                  <div className="timbre__block">
                    <h4 className="timbre__block-title">Amp</h4>
                    <Control disabled={disabled} {...getControlParameter(props, "level", "slider", "")} />
                    <Control disabled={disabled} {...getControlParameter(props, "panpot", "slider", "")} />
                    <Control disabled={disabled} {...getControlParameter(props, "punch_level", "slider", "")} />
                    <Control disabled={disabled} {...getControlParameter(props, "key_track", "slider", "")} />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Grid>
      </Panel>
    );
  }
};

Timbre.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  disabled: React.PropTypes.bool
};

Timbre.defaultProps = {
  disabled: false
};

export default Timbre;
