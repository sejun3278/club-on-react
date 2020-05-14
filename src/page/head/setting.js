import React, { Component } from 'react';

class setting extends Component {
  render() {
    const { img, _clickSet } = this.props;

    return (
        <div id='setting_div'>
          <div id='setting_title'>
            <img src={img.other.setting} id='setting_img' alt='' />
            <h3> Setting </h3>
          </div>

          <div id='setting_tool'>
            <div id='setting_index'>
              <li> 배치 설정 </li>
              <li title='배경 음악을 설정합니다.'> 음악 설정 </li>
            </div>

            <div id='setting_contents'>
              <ul>
                <li title='기본적인 캐릭터로 배치합니다.' onClick={() => _clickSet('basic')}> 기본 배치 </li>
                <li title='랜덤으로 캐릭터를 배치합니다.' onClick={() => _clickSet('random')}> 랜덤 배치 </li>
              </ul>

              <ul>
                <select id='select_music'>
                  <option> 1. 00:32  </option>
                </select>
                <img id='music_player' src={img.other.music_play} title='음악 재생' />
              </ul>
            </div>

            <h4 id='change_ment'> </h4>
          </div>
        </div>
    );
  }
}

export default setting;