import React      from 'react';

import { updateCurrentProgramParam } from 'actions/actions';
import Knob         from 'components/ui/Knob';
import Toggle       from 'components/ui/Toggle';
import Simple       from 'components/ui/Simple';
import Select       from 'components/ui/Select';
import Slider       from 'components/ui/Slider';
import PushButtons  from 'components/ui/PushButtons';
import { willParametersChange } from 'util/component-helpers';



class Control extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    let { parameter, data, disabled, disabledWhenParameterEmpty } = this.props;
    let nextData = nextProps.data;
    let ids = disabledWhenParameterEmpty ? [disabledWhenParameterEmpty] : [];
    ids.push(parameter.id);

    return willParametersChange(parameter.parent, data, nextData, ids) || disabled !== nextProps.disabled;
  }

  getParameterProps() {

    // TODO: parameter should return all props

    let { parameter, data, onChange, name, disabled, disabledWhenParameterEmpty } = this.props;
    let { midiId, midiSubId } = parameter.getMidiId();
    let paramProps = parameter.getProps(data);
    let disabledByDependentParameterEmpty = false;

    if (disabledWhenParameterEmpty) {
      // expect dependent parameter to be 0 when disabled
      disabledByDependentParameterEmpty = parameter.parent.getParameter(disabledWhenParameterEmpty).getValue(data) === 0;
    }

    let props = Object.assign(paramProps,
      {
        name: name || parameter.name,
        onChange: (value) => {
          onChange(parameter, value);
        },
        disabled: disabled || disabledByDependentParameterEmpty,
      });

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
        props.center = this.props.parameter.lookup.center;
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
  className: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  disabledWhenParameterEmpty: React.PropTypes.string,
}

Control.defaultProps = {
  type: "select",
  className: "control",
  disabled: false,
}

// export default connect()(Control);
export default Control;
