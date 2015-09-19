//import React from 'react';
import React              from 'react/addons';

import Parameter          from 'components/program/parameter';
import Osc                from 'components/program/osc';

import programParameters  from 'data/program_parameters';
import programActions     from 'actions/program_actions';

class ProgramDump extends React.Component {
  constructor(props) {
    super(props);

    let { shouldComponentUpdate } = React.addons.PureRenderMixin;

    this.shouldComponentUpdate    = shouldComponentUpdate.bind(this);
  }

  handleChange(value, offset) {
    programActions.updateParam(value, offset);
  }

  renderParameters(programParameters, data, level) {

    let parameters = programParameters.map((parameter, index) => {

      if (parameter.isGroup) {

        if (parameter.category === "Osc") {
          return (
            <Osc parameterGroup={parameter} offset={parameter.getOffset()} programData={data} />
          );
        } else {
          let childParameters = this.renderParameters(parameter.parameters, data, level + 1);

          if (level === 1) return (<div key={level * 1000 + index} className=""><h3>{parameter.name}</h3>{childParameters}</div>);
          if (level === 2) return (<div key={level * 1000 + index} className=""><h4>{parameter.name}</h4>{childParameters}</div>);
          if (level === 3) return (<div key={level * 1000 + index} className=""><h5>{parameter.name}</h5>{childParameters}</div>);
          if (level === 4) return (<div key={level * 1000 + index} className=""><h6>{parameter.name}</h6>{childParameters}</div>);
        }
      } else {
        let props = {
          name: parameter.name,
          value: parameter.getValue(data),
          text: parameter.getValueAsText(data),
          offset: parameter.getOffset(),
          category: parameter.category,
          allValues: parameter.lookup instanceof Array ? parameter.lookup : null,
          onChange: this.handleChange.bind(this)
        };

        return (
          <Parameter key={props.offset} {...props} />
        );
      }
    });

    return (
      <div>
        {parameters}
      </div>
    );
  }

  render() {
    let {program} = this.props;
    let data = program.get("data");
    let dataJS = data.toJS();

    return (
      <div>
        {this.renderParameters(programParameters, dataJS, 1)}
      </div>
    );
  }
}

export default ProgramDump;
