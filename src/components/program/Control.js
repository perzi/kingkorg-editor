import React      from 'react';

import { updateCurrentProgramParam } from 'actions/actions';
import Knob         from 'components/ui/Knob';
import Toggle       from 'components/ui/Toggle';
import Simple       from 'components/ui/Simple';
import Select       from 'components/ui/Select';
import Slider       from 'components/ui/Slider';
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
    let { parameter, data, onChange, name } = this.props;
    let offset = parameter.getOffset();
    let text = parameter.getValueAsText(data);
    let value = parameter.getValue(data);
    let { midiId, midiSubId } = parameter.getMidiId();

    let props = {
      id: parameter.id,
      name: name || parameter.name,
      value: value,
      text: text,
      offset: offset,
      category: parameter.category,
      min: parameter.lookup.min,
      max: parameter.lookup.max,
      lookup: parameter.lookup,
      onChange: (value) => {
        onChange(offset, value, midiId, midiSubId);
      }
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

      case "slider":
        ControlToRender = Slider;
        break;

      case "pushbuttons":
        ControlToRender = PushButtons;
        break;

      case "toggle":
        ControlToRender = Toggle;
        break;

      default:
        break;
    }

    return (
      <ControlToRender {...props} className={this.props.className} />
    );
  }
}

Control.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  id: React.PropTypes.string.isRequired,
  data: React.PropTypes.array.isRequired,
  name: React.PropTypes.string,
  parameter: React.PropTypes.object.isRequired,
  type: React.PropTypes.oneOf(["knob", "select", "cknob", "simple", "pushbuttons", "slider", "toggle"]),
  className: React.PropTypes.string
}

Control.defaultProps = {
  type: "select",
  className: "control"
}

// export default connect()(Control);
export default Control;
