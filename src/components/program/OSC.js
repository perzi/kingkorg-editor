import React                from 'react';

import Control                from 'components/program/Control';
import Simple                 from 'components/ui/Simple';
import { oscTypeDictionary }  from 'data/programParameters';

import 'styles/components/program/osc';


class Osc extends React.Component {
  constructor(props) {
    super(props);
  }

  renderSimple(index, visible, name) {

    if (!visible || name === "-") return false;

    let parameter = this.props.parameter.parameters[index];
    let data = this.props.data;
    let offset = parameter.getOffset();
    let props = {
      name: name || parameter.name,
      value: parameter.getValue(data),
      text: parameter.getValueAsText(data),
      offset: offset,
      category: parameter.category,
      allValues: parameter.lookup instanceof Array ? parameter.lookup : null,
      onChange: ((value) => {
        this.props.onChange(offset, value);
      }).bind(this)
    };

    return (
      <Simple key={props.offset} {...props} className="control" />
    )
  }

  getControlParameter(offset, type, hidden = false, name) {

    if (hidden || name === "-") return null;

    let id = this.props.parameter.parameters[offset].id;

    return {
      data: this.props.data,
      parentParameter: this.props.parameter,
      id: id,
      type: "select"
    }
  }

  render() {
    let oscTypeParameter = this.props.parameter.parameters[0];
    let oscTypeValue = oscTypeParameter.getValue(this.props.data);

    let visible = oscTypeValue !== 0;
    let hidden = oscTypeValue === 0;
    let oscTypeDef = oscTypeDictionary[oscTypeValue];
    let ctrl1Name = oscTypeDef ? oscTypeDef.ctrl1Name : undefined;
    let ctrl2Name = oscTypeDef ? oscTypeDef.ctrl2Name : undefined;

    return (
      <div className="osc">
        <Control {...this.getControlParameter(0, "select", false)} />
        {this.renderSimple(1, visible)}
        {this.renderSimple(2, visible)}
        {this.renderSimple(3, visible, ctrl1Name)}
        {this.renderSimple(4, visible, ctrl2Name)}
      </div>
    );
  }
}

Osc.propTypes = {
  onChange: React.PropTypes.func,
  offset: React.PropTypes.number.isRequired,
  parameter: React.PropTypes.object.isRequired,
  data: React.PropTypes.array.isRequired
};


Osc.defaultProps = {
  onChange: (offset, value) => { }
};


export default Osc;
