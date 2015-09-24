import React                from 'react/addons';
import Parameter            from 'components/program/parameter';
import {oscTypeDictionary}  from 'data/program_parameters';

class Osc extends React.Component {
  constructor(props) {
    super(props);
    let { shouldComponentUpdate } = React.addons.PureRenderMixin;
    this.shouldComponentUpdate    = shouldComponentUpdate.bind(this);
  }

  renderParameter(index, name, visible) {

    let parameter = this.props.parameterGroup.parameters[index];

    if (name === "-") return false;

    let data = this.props.programData;
    let props = {
      name: name || parameter.name,
      value: parameter.getValue(data),
      text: parameter.getValueAsText(data),
      offset: parameter.getOffset(),
      category: parameter.category,
      allValues: parameter.lookup instanceof Array ? parameter.lookup : null,
      onChange: this.props.onChange
    };

    return (
      <Parameter key={props.offset} {...props} />
    )
  }

  render() {
    let oscTypeParameter = this.props.parameterGroup.parameters[0];
    let oscTypeValue = oscTypeParameter.getValue(this.props.programData);

    let oscTypeDef = oscTypeDictionary[oscTypeValue];
    let ctrl1Name = oscTypeDef ? oscTypeDef.ctrl1Name : undefined;
    let ctrl2Name = oscTypeDef ? oscTypeDef.ctrl2Name : undefined;

    return (
      <div className="">
        <h3>{this.props.parameterGroup.name}</h3>
        {this.renderParameter(0)}
        {this.renderParameter(1)}
        {this.renderParameter(2)}
        {this.renderParameter(3, ctrl1Name)}
        {this.renderParameter(4, ctrl2Name)}
      </div>
    );
  }
}

Osc.propTypes = {
  onChange: React.PropTypes.function,
  offset: React.PropTypes.number.isRequired,
  parameterGroup: React.PropTypes.object.isRequired,
  programData: React.PropTypes.array.isRequired
};


Osc.defaultProps = {
  onChange: (offset, value) => {
    console.log(value, offset);
  }
};


export default Osc;
