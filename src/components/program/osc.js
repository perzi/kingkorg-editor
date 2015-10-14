import React                from 'react/addons';
import Parameter            from 'components/program/parameter';
import Simple               from 'components/ui/simple';
import {oscTypeDictionary}  from 'data/program_parameters';

import 'styles/components/program/osc';

class Osc extends React.Component {
  constructor(props) {
    super(props);
    let { shouldComponentUpdate } = React.addons.PureRenderMixin;
    this.shouldComponentUpdate    = shouldComponentUpdate.bind(this);
  }

  // renderParameter(index, name, visible) {
  //
  //   let parameter = this.props.parameter.parameters[index];
  //
  //   if (name === "-") return false;
  //
  //   let data = this.props.data;
  //   let props = {
  //     name: name || parameter.name,
  //     value: parameter.getValue(data),
  //     text: parameter.getValueAsText(data),
  //     offset: parameter.getOffset(),
  //     category: parameter.category,
  //     allValues: parameter.lookup instanceof Array ? parameter.lookup : null,
  //     onChange: this.props.onChange
  //   };
  //
  //   return (
  //     <Parameter key={props.offset} {...props} />
  //   )
  // }

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
      <Simple key={props.offset} {...props} />
    )
  }

  render() {
    let oscTypeParameter = this.props.parameter.parameters[0];
    let oscTypeValue = oscTypeParameter.getValue(this.props.data);

    let visible = oscTypeValue !== 0;
    let oscTypeDef = oscTypeDictionary[oscTypeValue];
    let ctrl1Name = oscTypeDef ? oscTypeDef.ctrl1Name : undefined;
    let ctrl2Name = oscTypeDef ? oscTypeDef.ctrl2Name : undefined;

    return (
        <div className="osc">
          <div className="osc__control">{this.renderSimple(0, true)}</div>
          <div className="osc__control">{this.renderSimple(1, visible)}</div>
          <div className="osc__control">{this.renderSimple(2, visible)}</div>
          <div className="osc__control">{this.renderSimple(3, visible, ctrl1Name)}</div>
          <div className="osc__control">{this.renderSimple(4, visible, ctrl2Name)}</div>
        </div>
    );
  }
}

//          <div className="osc__name"><b>{this.props.parameter.name}</b></div>


Osc.propTypes = {
  onChange: React.PropTypes.function,
  offset: React.PropTypes.number.isRequired,
  parameter: React.PropTypes.object.isRequired,
  data: React.PropTypes.object.isRequired
};


Osc.defaultProps = {
  onChange: (offset, value) => { }
};


export default Osc;
