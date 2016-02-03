import React      from 'react';
import { connect } from 'react-redux';

import { updateCurrentProgramParam } from 'actions/actions';
import Knob         from 'components/ui/Knob';
import Simple       from 'components/ui/Simple';
import Select       from 'components/ui/Select';
import PushButtons  from 'components/ui/PushButtons';


class Control extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    let parameter = this.props.parameter;
    let data = this.props.data;
    let nextData = nextProps.data;

    return parameter.getValue(nextData) !== parameter.getValue(data);
  }

  getParameterProps() {
    let parameter = this.props.parameter;
    let data = this.props.data;
    let offset = parameter.getOffset();
    let text = parameter.getValueAsText(data);
    let value = parameter.getValue(data);

    let props = {
      name: parameter.name,
      value: value,
      text: text,
      offset: offset,
      category: parameter.category,
      lookup: parameter.lookup,
      allValues: parameter.lookup instanceof Array ? parameter.lookup : null,
      onChange: ((value) => {
        this.props.dispatch(updateCurrentProgramParam(offset, value));
      }).bind(this)
    };

    return props;
  }

  render() {
    let props = this.getParameterProps();
    let ControlToRender = null;

    switch (this.props.type) {
      case "knob":
      case "cknob":
        ControlToRender = Knob;
        props.center = this.props.type === "cknob";
        break;

      case "simple":
        ControlToRender = Simple;
        break;

      case "select":
        ControlToRender = Select;
        break;

      case "pushbuttons":
        ControlToRender = PushButtons;
        break;

      default:
        break;
    }

    return (
      <ControlToRender {...props} className="control" />
    );
  }
}

Control.propTypes = {
  id: React.PropTypes.string.isRequired,
  data: React.PropTypes.array.isRequired,
  parameter: React.PropTypes.object.isRequired,
  type: React.PropTypes.oneOf(["knob", "select", "cknob", "simple", "pushbuttons"])
}

Control.defaultProps = {
  type: "select"
}

export default connect()(Control);
