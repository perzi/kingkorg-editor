import React          from 'react/addons';

import ProgramActions from 'actions/program_actions'
import ProgramStore   from 'stores/program_store';

import KingKORG       from 'components/kingkorg';

class CurrentProgram extends React.Component {
  constructor(props) {
    super(props);

    let { shouldComponentUpdate } = React.addons.PureRenderMixin;
    this.shouldComponentUpdate    = shouldComponentUpdate.bind(this);

    this.state = {
      program: ProgramStore.getState()
    }

    this.programChanged = this.programChanged.bind(this);
  }

  componentDidMount()    {
    ProgramStore.listen(this.programChanged);
  }

  componentWillUnmount() {
    ProgramStore.unlisten(this.programChanged);
  }

  programChanged(program)  {
    this.setState({ program: program });
  }

  handleLoad1() {
    ProgramActions.fromData([0xf0, 0x42, 0x30, 0x00, 0x01, 0x18, 0x40, 0x00, 0x53, 0x74, 0x61, 0x62, 0x20, 0x4b, 0x69, 0x00, 0x6e, 0x67, 0x20, 0x20, 0x20, 0x00, 0x00, 0x40, 0x00, 0x3c, 0x02, 0x01, 0x04, 0x40, 0x74, 0x01, 0x7d, 0x01, 0x0d, 0x02, 0x00, 0x28, 0x0c, 0x00, 0x09, 0x00, 0x00, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x7f, 0x7f, 0x7f, 0x04, 0x00, 0x7f, 0x28, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x7f, 0x40, 0x00, 0x00, 0x00, 0x00, 0x40, 0x00, 0x7f, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x7f, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0x05, 0x00, 0x00, 0x05, 0x00, 0x00, 0x00, 0x00, 0x02, 0x4f, 0x00, 0x00, 0x0d, 0x00, 0x10, 0x00, 0x00, 0x07, 0x0f, 0x52, 0x00, 0x07, 0x00, 0x10, 0x18, 0x00, 0x02, 0x0f, 0x00, 0x00, 0x00, 0x03, 0x0f, 0x00, 0x00, 0x03, 0x1d, 0x00, 0x00, 0x00, 0x03, 0x1e, 0x00, 0x00, 0x02, 0x00, 0x00, 0x0a, 0x40, 0x00, 0x00, 0x00, 0x0f, 0x02, 0x00, 0x00, 0x28, 0x05, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x7f, 0x00, 0x7f, 0x7f, 0x00, 0x7f, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x64, 0x40, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x7f, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x7f, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0x05, 0x00, 0x00, 0x00, 0x05, 0x00, 0x00, 0x00, 0x02, 0x46, 0x00, 0x00, 0x00, 0x0d, 0x00, 0x00, 0x00, 0x02, 0x01, 0x00, 0x00, 0x00, 0x03, 0x01, 0x00, 0x00, 0x02, 0x00, 0x0f, 0x00, 0x00, 0x03, 0x0f, 0x00, 0x00, 0x00, 0x03, 0x1d, 0x00, 0x00, 0x03, 0x1e, 0x00, 0x00, 0x00, 0x05, 0x01, 0x3c, 0x01, 0x00, 0x00, 0x00, 0x40, 0x01, 0x01, 0x3d, 0x33, 0x00, 0x00, 0x00, 0x7f, 0x00, 0x00, 0x64, 0x00, 0x00, 0x01, 0x00, 0x02, 0x00, 0x14, 0x02, 0x00, 0x1e, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x64, 0x00, 0x00, 0x00, 0x64, 0x5d, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x05, 0x02, 0x4f, 0x00, 0x08, 0x01, 0x01, 0x34, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xf7]);
  }

  handleLoad2() {
    ProgramActions.fromData([0xf0, 0x42, 0x30, 0x00, 0x01, 0x18, 0x40, 0x00, 0x43, 0x6c, 0x61, 0x73, 0x73, 0x69, 0x63, 0x00, 0x20, 0x4c, 0x65, 0x61, 0x64, 0x01, 0x00, 0x00, 0x00, 0x3c, 0x00, 0x00, 0x0a, 0x40, 0x00, 0x01, 0x7d, 0x00, 0x0f, 0x02, 0x01, 0x09, 0x05, 0x00, 0x01, 0x00, 0x00, 0x00, 0x08, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x05, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x7f, 0x7f, 0x7f, 0x02, 0x00, 0x6b, 0x13, 0x02, 0x00, 0x00, 0x00, 0x00, 0x00, 0x6c, 0x40, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x77, 0x7f, 0x18, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0x49, 0x00, 0x00, 0x05, 0x00, 0x00, 0x00, 0x00, 0x02, 0x46, 0x00, 0x00, 0x0d, 0x00, 0x10, 0x00, 0x00, 0x07, 0x0f, 0x61, 0x00, 0x07, 0x00, 0x10, 0x0a, 0x00, 0x05, 0x0f, 0x00, 0x00, 0x00, 0x03, 0x0f, 0x00, 0x00, 0x03, 0x1d, 0x00, 0x00, 0x00, 0x03, 0x1e, 0x00, 0x00, 0x02, 0x00, 0x00, 0x0a, 0x40, 0x00, 0x00, 0x00, 0x0f, 0x02, 0x00, 0x00, 0x28, 0x05, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x7f, 0x00, 0x7f, 0x7f, 0x00, 0x7f, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x64, 0x40, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x7f, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x7f, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0x05, 0x00, 0x00, 0x00, 0x05, 0x00, 0x00, 0x00, 0x02, 0x46, 0x00, 0x00, 0x00, 0x0d, 0x00, 0x00, 0x00, 0x02, 0x01, 0x00, 0x00, 0x00, 0x03, 0x01, 0x00, 0x00, 0x02, 0x00, 0x0f, 0x00, 0x00, 0x03, 0x0f, 0x00, 0x00, 0x00, 0x03, 0x1d, 0x00, 0x00, 0x03, 0x1e, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x40, 0x03, 0x01, 0x2f, 0x40, 0x00, 0x00, 0x00, 0x7f, 0x00, 0x00, 0x64, 0x00, 0x00, 0x01, 0x00, 0x02, 0x00, 0x14, 0x02, 0x00, 0x1e, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x64, 0x00, 0x00, 0x00, 0x64, 0x78, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0x02, 0x32, 0x00, 0x08, 0x01, 0x01, 0x7f, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xf7]);
  }

  handleLoad3() {
    ProgramActions.fromData([0xf0, 0x42, 0x30, 0x00, 0x01, 0x18, 0x40, 0x00, 0x44, 0x69, 0x73, 0x74, 0x4d, 0x6f, 0x64, 0x00, 0x4c, 0x65, 0x61, 0x64, 0x20, 0x01, 0x01, 0x40, 0x00, 0x3c, 0x00, 0x00, 0x0a, 0x40, 0x74, 0x00, 0x00, 0x00, 0x0f, 0x0c, 0x01, 0x14, 0x05, 0x04, 0x19, 0x00, 0x7f, 0x25, 0x30, 0x00, 0x00, 0x00, 0x00, 0x09, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x7f, 0x00, 0x7f, 0x0a, 0x00, 0x47, 0x55, 0x00, 0x15, 0x15, 0x1d, 0x00, 0x08, 0x3c, 0x40, 0x00, 0x76, 0x00, 0x0d, 0x61, 0x00, 0x00, 0x05, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x7f, 0x05, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0x1d, 0x00, 0x00, 0x05, 0x00, 0x00, 0x00, 0x00, 0x02, 0x46, 0x00, 0x00, 0x0d, 0x00, 0x00, 0x00, 0x00, 0x00, 0x06, 0x00, 0x00, 0x07, 0x02, 0x0f, 0x6a, 0x00, 0x07, 0x1b, 0x18, 0x00, 0x00, 0x07, 0x10, 0x08, 0x00, 0x07, 0x28, 0x10, 0x00, 0x00, 0x03, 0x1e, 0x00, 0x00, 0x00, 0x00, 0x04, 0x0a, 0x40, 0x74, 0x00, 0x00, 0x0f, 0x0c, 0x00, 0x01, 0x14, 0x05, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x7f, 0x00, 0x7f, 0x7f, 0x05, 0x7f, 0x27, 0x00, 0x00, 0x40, 0x00, 0x00, 0x00, 0x50, 0x40, 0x00, 0x76, 0x00, 0x00, 0x00, 0x40, 0x7f, 0x05, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x7f, 0x05, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0x05, 0x00, 0x00, 0x00, 0x05, 0x00, 0x00, 0x00, 0x02, 0x46, 0x00, 0x00, 0x00, 0x0d, 0x00, 0x00, 0x00, 0x02, 0x01, 0x00, 0x00, 0x00, 0x03, 0x01, 0x00, 0x00, 0x02, 0x00, 0x0f, 0x00, 0x00, 0x03, 0x0f, 0x00, 0x00, 0x00, 0x03, 0x1d, 0x00, 0x00, 0x03, 0x1e, 0x00, 0x00, 0x00, 0x03, 0x01, 0x28, 0x01, 0x00, 0x40, 0x00, 0x40, 0x05, 0x03, 0x0e, 0x24, 0x00, 0x00, 0x00, 0x7f, 0x00, 0x00, 0x64, 0x00, 0x00, 0x01, 0x00, 0x02, 0x00, 0x14, 0x02, 0x00, 0x1e, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x64, 0x00, 0x04, 0x00, 0x64, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0x00, 0x02, 0x50, 0x00, 0x08, 0x01, 0x01, 0x2d, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xf7]);
  }

  render() {
    let {program} = this.state;

    return (
      <div>

        <h2>{program.get("name")}</h2>

        <button onClick={this.handleLoad1.bind(this)}>Stab King</button>
        <button onClick={this.handleLoad2.bind(this)}>Classic Lead</button>
        <button onClick={this.handleLoad3.bind(this)}>DistModLead</button>

      </div>
    );
  }
}

export default CurrentProgram;
