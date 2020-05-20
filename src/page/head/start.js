import React, { Component } from 'react';

class start extends Component {
  constructor(props) {
    super(props)
    this.state = {
      DJ_fast : false,
      DJ_ready : false,
    }
  }

  _clubOn = () => {
    const { _changeClubOnState, club_on } = this.props;

    // 클럽 off 상태에서만 실행
    if(club_on) {
      return;
    }
    
    if(this.props.char_num === 0) {
      return alert('하나 이상의 캐릭터를 추가해주세요.')
    }

    return _changeClubOnState(true);
  }

  // DJ 에 마우스 올릴 경우와 벗어날 경우
  _toggleMoveDJ = (boo) => {
    this.setState({ DJ_fast : boo })
  }

  // 클럽온 버튼에 마우스 올림과 벗어날 경우
  _toggleStart = (boo) => {
    this.setState({ DJ_ready : boo})
  }

  render() {
    const { img, club_on, light } = this.props;
    const { _clubOn, _toggleMoveDJ, _toggleStart } = this;
    const { DJ_fast, DJ_ready } = this.state;

    const fast = img.character[1][0][0][2];
    const ready = img.other.dj_ready;
    return (
        <div id='update_and_start'>
          {/* <p> 최종 수정일 : 2020-05-14 </p> */}
          {!club_on 
          ?
            <h1 title="클럽 오픈" 
                onClick={() => _clubOn()}
                onMouseOver={() => _toggleStart(true)}
                onMouseLeave={() => _toggleStart(false)}>
              Club Off 
            </h1>
            
          : <h1 className={!light ? "light_off" : null}
                style={!light ? {"borderColor" : 'white'} : null}
          > 
              Club On 
            </h1> }

            <img
              onMouseOver={!DJ_fast ? () => _toggleMoveDJ(true) : null}
              onMouseLeave={DJ_fast ? () => _toggleMoveDJ(false) : null}

              src={
                DJ_ready ? ready : 
                !DJ_fast ? img.other.origin_dj : fast} 
              alt='' id='dj'/>
        </div>
    );
  }
}

export default start;