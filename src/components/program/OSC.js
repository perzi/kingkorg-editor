import React                from 'react';

import Control                from 'components/program/Control';
import Simple                 from 'components/ui/Simple';
import { oscTypeDictionary }  from 'data/programParameters';
import { getControlParameter } from 'util/component-helpers';


import 'styles/components/program/osc';


class Osc extends React.Component {
  constructor(props) {
    super(props);
  }

  getControlParameter(offset, type, hidden = false, name) {

    if (hidden || name === "-") return null;

    let id = this.props.parameter.parameters[offset].id;
    let parameter = this.props.parameter.getParameter(id);

    return {
      data: this.props.data,
      parameter: parameter,
      id: id,
      type: "select",
      onChange: this.props.onChange
    }
  }

  renderControl(id, hidden, name) {

    if (hidden || name === "-") return null;

    let props = getControlParameter(this.props, id, "slider", "")
    if (name) props.name = name;

    return (<Control {...props} />);
  }

  render() {
    let oscTypeParameter = this.props.parameter.parameters[0];
    let oscTypeValue = oscTypeParameter.getValue(this.props.data);

    let visible = oscTypeValue !== 0;
    let hidden = oscTypeValue === 0;
    let oscTypeDef = oscTypeDictionary[oscTypeValue];

    // TODO: fix Ctrl 1 & 2 lookup which depends on value of osc type
    let ctrl1Name = oscTypeDef ? oscTypeDef.ctrl1Name : undefined;
    let ctrl2Name = oscTypeDef ? oscTypeDef.ctrl2Name : undefined;

    return (
      <div className="osc">
        <Control {...this.getControlParameter(0, "select", false)} />
        {this.renderControl("semitone", hidden)}
        {this.renderControl("tune", hidden)}
        {this.renderControl("ctrl1", hidden, ctrl1Name)}
        {this.renderControl("ctrl2", hidden, ctrl2Name)}
      </div>
    );
  }
}

Osc.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  offset: React.PropTypes.number.isRequired,
  parameter: React.PropTypes.object.isRequired,
  data: React.PropTypes.array.isRequired
};

export default Osc;
