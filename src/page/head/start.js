import React, { Component } from 'react';

class start extends Component {
  render() {
    const { img } = this.props;

    return (
        <div id='update_and_start'>
            {/* <p> 최종 수정일 : 2020-05-14 </p> */}
            <h1 title="클럽 오픈"> Club Off </h1>

            <img src={img.other.origin_dj} alt='' id='dj'/>
        </div>
    );
  }
}

export default start;