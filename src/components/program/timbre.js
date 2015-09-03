//import React from 'react';
import React                    from 'react/addons';
import Param            from './param';


class Timbre extends React.Component {
  constructor(props) {
    super(props);

    let { shouldComponentUpdate } = React.addons.PureRenderMixin;

    this.shouldComponentUpdate    = shouldComponentUpdate.bind(this);
  }

  render() {
    let data = this.props.data;

    let values = data.map((value, index) => {
      return (
        <Param id={index} value={value} />
      )
    })

    return (
      <div>
          {values}
      </div>
    );
  }
}


export default Timbre;
