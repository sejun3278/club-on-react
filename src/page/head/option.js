import React, { Component } from 'react';

class option extends Component {
  render() {
      const { _reset, char_num } = this.props;

    return (
        <div id='game_reset_div'>
            <h4 id='game_reset' onClick={() => _reset()}> 초기화 (F5) </h4>
            <h4> 추가된 캐릭터 수 : {char_num} </h4>
        </div>
    );
  }
}

export default option;