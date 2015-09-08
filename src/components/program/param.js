//import React from 'react';
import React                    from 'react/addons';

class Example extends React.Component {
  constructor(props) {
    super(props);

    let { shouldComponentUpdate } = React.addons.PureRenderMixin;

    this.shouldComponentUpdate    = shouldComponentUpdate.bind(this);
  }

  getText() {
    // TODO: check if object or not
    if (this.props.translation) {
      return this.props.translation[this.props.value];
    } else {
      return this.props.value;
    }
  }

  render() {
    let props = this.props;
    let text = this.getText()
    return (
      <div>
          <span className="param param-title">{props.title}</span>
          <span className="param param-value">{text}</span>
      </div>
    );
  }
}

export default Example;
