import React, { Component } from 'react';
import { Stage } from './index'

class body extends Component {
  render() {
      const { up_stage } = this.props;

    return (
        <div id='body'>
            <Stage up_stage={up_stage}/>
        </div>
    );
  }
}

export default body;