//import React from 'react';
import React                    from 'react/addons';
import ProgramStore            from 'stores/program_store';
import ProgramActions            from 'actions/program_actions';

class Example extends React.Component {
  constructor(props) {
    super(props);

    let { shouldComponentUpdate } = React.addons.PureRenderMixin;

    this.shouldComponentUpdate    = shouldComponentUpdate.bind(this);
    this.state                    = { program: ProgramStore.getState() };
    this.programChanged           = this.programChanged.bind(this);
  }

  componentDidMount()    { ProgramStore.listen(this.programChanged); }
  componentWillUnmount() { ProgramStore.unlisten(this.programChanged); }

  programChanged(program)  { this.setState({ program: program }); }

  onChange = evt => {
    ProgramActions.setName(evt.target.value);
  }

  render() {
    let {program} = this.state;

    return (
      <div>
          <h1>Program: {program.get("name")}</h1>
          <input type="text" value={this.state.name} onChange={this.onChange}/>
      </div>
    );
  }
}

export default Example;
