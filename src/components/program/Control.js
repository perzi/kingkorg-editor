import React      from 'react';
import { connect } from 'react-redux';

import { updateCurrentProgramParam } from 'actions/actions';
import Knob       from 'components/ui/Knob';
import Simple     from 'components/ui/Simple';
import Select     from 'components/ui/Select';
import program    from 'data/program_parameters';


class Control extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    let parameter = this.props.parentParameter.getParameter(this.props.id);
    let data = this.props.data;
    let nextData = nextProps.data;

    return parameter.getValue(nextData) !== parameter.getValue(data);
  }

  getParameterProps() {
    let parameter = this.props.parentParameter.getParameter(this.props.id);
    let data = this.props.data;
    let offset = parameter.getOffset();
    let props = {
      name: parameter.name,
      value: parameter.getValue(data),
      text: parameter.getValueAsText(data),
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
    // TODO: add props to render different type of controls

    if (this.props.type === "knob" || this.props.type === "cknob") {
      return (
        <Knob {...this.getParameterProps()} center={this.props.type === "cknob"} />
      );
    } else if (this.props.type === "select") {
      return (
        <Select {...this.getParameterProps()} />
      );
    } else {
      return (
        <Simple {...this.getParameterProps()} />
      );
    }
  }
}

Control.propTypes = {
  id: React.PropTypes.string.isRequired,
  data: React.PropTypes.object.isRequired,
  parentParameter: React.PropTypes.object.isRequired,
  type: React.PropTypes.string
}

export default connect()(Control);
