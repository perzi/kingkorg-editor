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
          <span className="param param-title">{this.props.parameter.category + " "}{this.props.parameter.name} <span className="raw">{this.props.parameter.getOffset()}</span></span>
          <span className="param param-value">{text} <span className="raw">{value}</span></span>
      </div>
    );
  }
}

export default Example;
