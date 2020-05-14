import React, { Component } from 'react';

class stage extends Component {
  render() {
      const { up_stage } = this.props;

    return (
        <div>
            <div id='up_floor' className='stage_floor'>
                <div> </div>
                <div> </div>
                <div> </div>
                <div> </div>
                <div> </div>
                <div> </div>
                <div> </div>
                <div> </div>
            </div>

            <div id='down_floor' className='stage_floor'>
                <div> </div>
                <div> </div>
                <div> </div>
                <div> </div>
                <div> </div>
                <div> </div>
                <div> </div>
            </div>
        </div>
    );
  }
}

export default stage;