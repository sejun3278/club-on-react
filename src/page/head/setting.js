import React, { Component } from 'react';
import music_list from '../../json/music.json';

class setting extends Component {

  render() {
    const { img, _clickSet, _selectMusic, _playMusic, play_music } = this.props;

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
                <select id='select_music'
                    onChange={() => _selectMusic(window.event)}
                >
                  {music_list.music.map( (el, key) => {

                    return(
                    <option 
                      key={key}
                      value={JSON.stringify(el[0])}
                    > 
                      {key + 1}. {el[0].name} ({el[0].play}) 
                    </option>
                    )
                  })}
                </select>
                  <img 
                    onClick={!play_music ? () => _playMusic(true) : () => _playMusic(false)}
                    id='music_player' src={!play_music ? img.other.music_play : img.other.music_pause} 
                    title={!play_music ? "음악 재생" : "음악 정지"} alt=''/>
              </ul>
                  {/* {play_music 
                    ? <audio src={select_music} autoPlay> </audio> 
                    : null} */}
            </div>

            <h4 id='change_ment'> </h4>
          </div>
        </div>
    );
  }
}

export default setting;