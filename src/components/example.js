import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ProgramStore            from 'stores/program_store';
import ProgramActions            from 'actions/program_actions';

class Example extends React.Component {
  constructor(props) {
    super(props);

    let { shouldComponentUpdate } = PureRenderMixin;

    this.shouldComponentUpdate    = shouldComponentUpdate.bind(this);
    this.state                    = { program: ProgramStore.getState() };
    this.programChanged           = this.programChanged.bind(this);
  }

  componentDidMount()    {
    ProgramStore.listen(this.programChanged);
  }

  componentWillUnmount() {
    ProgramStore.unlisten(this.programChanged);
  }

  programChanged(program)  { this.setState({ program: program }); }

  onChange = evt => {
    ProgramActions.setName(evt.target.value);
  }

  render() {
    let {program} = this.state;
    let name = program.get("name");

    return (
      <div>
          <h1>Program: {name}</h1>
          <input type="text" value={name} onChange={this.onChange}/>
      </div>
    );
  }
}

export default Example;
