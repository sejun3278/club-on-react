import React, { Component } from 'react';
import { Logo, Start, Setting, Option } from './index'

var timeoutMent;
var playMusicTime;

class head extends Component {
    constructor(props) {
        super(props)
        this.state = {
          select_music : 'https://imgstoragesejun.s3.ap-northeast-2.amazonaws.com/Club+Music+1.mp3',
          play_music : false,
          play_time : 33000,
        }
      }

    componentDidUpdate() {
        const { club_on } = this.props;
        const { play_music } = this.state;

        if(club_on && !play_music) {
            //this._playMusic(true)
        }
    }
      
    // 배치 버튼 클릭
    _clickSet = (type) => {
        const { change, _complateChange, _setPeople, _setCharNum } = this.props;

        var select = '기본 배치';
        if(type === 'random') {
        // 랜덤 배치
            select = '랜덤 배치';
        }

        if(change) {
            if(!window.confirm(select + '를 하면 배치된 캐릭터들이 재구성됩니다. \n재구성하시겠습니까?')) {
                return;
            }
        }
        
        window.clearTimeout(timeoutMent);
        _complateChange();
        _setPeople(type)
        _setCharNum('set', 15)

        this._setMent(select)
    }

    // 배치 알림 설정
    _setMent = function(select) {
        const ment = document.getElementById('change_ment');
        ment.innerHTML = select + '가 완료되었습니다.';

        timeoutMent = window.setTimeout(function() {
            ment.innerHTML = '';
        }, 2000)
    }

    _reset = function() {
        if(window.confirm('화면을 재구성하시겠습니까?')) {
            return window.location.reload();
        }
    }

    // 음악 선택
    _selectMusic = (event) => {
        const data = JSON.parse(event.target.value);

        let select = data.url;
        let time = data.play_time

        this.setState({ select_music : select, play_time : time })
        this.props._selectMode(data.num)
        
        this._playMusic(false)
    }

    // 음악 재생
    _playMusic = (boo) => {
        const { play_time } = this.state;
        
        this.setState({ play_music : boo })

        if(boo) {
            playMusicTime = window.setTimeout(() => {
                this.setState({ play_music : false })

            }, play_time)

        } else {
            window.clearTimeout(playMusicTime);
        }
    }

  render() {
    const { img, char_num, _changeClubOnState, club_on, light, neonSign } = this.props;
    const { _clickSet, _reset, _selectMusic, _playMusic } = this; 
    const { play_music, select_music } = this.state;

    return (
        <div id='header'>
            <Logo 
                light={light}
            />

            <Start 
                img={img} 
                char_num={char_num}
                _changeClubOnState={_changeClubOnState}
                club_on={club_on}
                light={light}
                neonSign={neonSign}
            />
            
            {!club_on ? 
            <Setting 
                img={img}
                _clickSet={_clickSet}
                _selectMusic={_selectMusic}
                _playMusic={_playMusic}
                play_music={play_music}
                select_music={select_music}
            />
            : null}

            {play_music 
                ? <audio src={select_music} autoPlay> </audio> 
                : null}
            
            {!club_on ? 
            <Option 
                char_num={char_num}
                _reset={_reset}
            />
            : null}

        </div>
    );
  }
}

export default head;