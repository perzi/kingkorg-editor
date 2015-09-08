//import React from 'react';
import React                    from 'react/addons';

class Example extends React.Component {
  constructor(props) {
    super(props);

    let { shouldComponentUpdate } = React.addons.PureRenderMixin;

    this.shouldComponentUpdate    = shouldComponentUpdate.bind(this);
  }

  render() {
    let parameter = this.props.parameter;

    let text = parameter.getValueAsText(this.props.programData);
    let value = parameter.getValue(this.props.programData);

    return (
      <div>
          <span className="param param-title">{this.props.parameter.category + " "}{this.props.parameter.name} ({this.props.parameter.offset})</span>
          <span className="param param-value">{text} ({value})</span>
      </div>
    );
  }
}

export default Example;
