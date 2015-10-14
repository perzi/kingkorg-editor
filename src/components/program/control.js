import React          from 'react';
import Simple         from 'components/ui/simple';
import program        from 'data/program_parameters';
import ProgramActions from 'actions/program_actions';


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
      allValues: parameter.lookup instanceof Array ? parameter.lookup : null,
      onChange: ((value) => {
        ProgramActions.updateParam(offset, value);
      }).bind(this)
    };

    return props;
  }

  render() {
    // TODO: add props to render different type of controls
    return (
      <Simple {...this.getParameterProps()} />
    );
  }
}

Control.propTypes = {
  id: React.PropTypes.string.isRequired,
  data: React.PropTypes.object.isRequired,
  parentParameter: React.PropTypes.object.isRequired
}

export default Control;
