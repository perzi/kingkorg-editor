import React      from 'react';
import { connect } from 'react-redux';

import { updateCurrentProgramParam } from 'actions/actions';
import Knob       from 'components/ui/Knob';
import Simple     from 'components/ui/Simple';
import Select     from 'components/ui/Select';


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
    var props = this.getParameterProps();

    if (this.props.type === "knob" || this.props.type === "cknob") {
      return (
        <Knob {...props} center={this.props.type === "cknob"} className="control" />
      );
    } else if (this.props.type === "select") {
      return (
        <Select {...props} className="control" />
      );
    } else {
      return (
        <Select {...props} className="control" />
      );
    }
  }
}

Control.propTypes = {
  id: React.PropTypes.string.isRequired,
  data: React.PropTypes.array.isRequired,
  parentParameter: React.PropTypes.object.isRequired,
  type: React.PropTypes.string
}

export default connect()(Control);
