import React, { Component } from 'react';
import './App.css';
import img from './img.json';
import background from './json/background.json'
import { action_fn } from './json/action.js'

// 헤드 부분
import Head from './page/head/head'

// 바디 부분
import Body from './page/body/body'

var neonSign_obj = {};
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
        change : false,
        stage_people : [],
        char_num : 0,
        club_on : false,
        light : true,
        select_mode : 1,
    }
  }

  componentDidMount() {
    this._stageInit();
  }

  // change state를 true로 변경
  _complateChange = () => {
    this.setState({ change : true })
  }

  // stage 손님 설정
  _stageInit = () => {
    var people = [];

    // 상단 손님
    for(let i = 0; i < 15; i++) {
      people[i] = 'empty';
    }

    this.setState({ stage_people : people })
  }

  // 배치 설정
  _setPeople = (type) => {
    var people = [];

    for(let i = 0; i < 15; i++) {
      // 기본 배치
      if(type === 'basic') {
        people[i] = img.character[1][0][0][0];

      } else if(type === 'random') {
      // 랜덤 배치
      var person_type, person_acce, person_hair;
      var person = [];

      // 1. 손님 유형 구하기
      person_type = Math.trunc(Math.random() * (5 - 1)) + 1

      // 2. 손님 악세사리 구하기
      person_acce = Math.trunc(Math.random() * (5 - 0)) + 0

      // 3. 손님 모자 구하기
      person_hair = Math.trunc(Math.random() * (4 - 0)) + 0

      // 4. 모두 종합해서 손님 구성
      person = img.character[person_type][person_acce][person_hair][0];

      people[i] = person;
      }
    }; // for 끝

    this.setState({ stage_people : people })
  }

  // 선택한 옵션으로 캐릭터 변경
  _changeCharacter = (type, char_num, select_num, profile, toogle) => {
    // 선택한 유형, 캐릭터 번호 (-1), 선택한 번호 (+1), 해당 캐릭터의 기존 정보, 탈착여부
    const { change } = this.state;
    const { _setCharNum } = this;

    let char_info = this.state.stage_people;
    let select_img = '';
    let { select_type, select_acce, select_hat } = 0;

    // 체인지 여부 확인
    if(!change) {
      this.setState({ change : true })
    }

    if(profile !== undefined) {
      // empty 가 아닐 때
      select_type = profile[0]
      select_acce = profile[1]
      select_hat = profile[2]

    } else {
      select_type = 0;
      select_acce = 0
      select_hat = 0

      _setCharNum('add', 1)
    }

    if(type === 'acce' || type === 'hat') {
      if(select_type === 0) {
        return alert('캐릭터 유형을 먼저 선택해주세요.')
      }
    }

    if(type === 'char') {
      // 캐릭터 유형 변경
      select_type = select_num;

    } else if(type === 'acce') {
      select_acce = select_num;

      if(!toogle) {
        select_acce = 0;
      }

    } else if(type === 'hat') {
      select_hat = select_num;

      if(!toogle) {
        select_hat = 0;
      }
    }
    
    select_img = img.character[select_type][select_acce][select_hat][0];
    char_info[char_num] = select_img;

    this.setState({ stage_people : char_info })
  }

  // 구성된 총 캐릭터 수 조정
  _setCharNum = (type, num) => {
    let num_result = this.state.char_num;
    
    if(type === 'delete') {
      num_result = num_result - num;

    } else if(type === 'set') {
      num_result = num;
    
    } else if(type === 'add') {
      num_result = num_result + num;
    }

    if(num_result === 0) {
      this.setState({ change : false })
    }

    this.setState({ char_num : num_result })
  }

  // 클럽 온 (게임 시작) 
  _changeClubOnState = (boo) => {
    this.setState({ club_on : boo })
    
    const people_array = this.state.stage_people;

    if(boo) {
      this._toggleLight(false, 0)

      for(let i = 0; i < people_array.length; i++) {
        if(people_array[i].includes('empty')) {
          people_array[i] = null;
        }
      }
      this.setState({ stage_people : people_array })
    }

  }

  // 조명 on / off
  _toggleLight = (boo, num) => {

    if(!boo) {
      if(num >= 11) {
        this.setState({ light : false })
        this._startNeonSignEffect('sign');
        return;
      }

      document.body.style.backgroundColor = background.background.club_on[num];
      num++;

      window.setTimeout(() => {
        this._toggleLight(false, num)
      }, 25)

    } else {
      document.body.style.backgroundColor = 'white'
      this.setState({ light : true })
    }
  }

  // 조명 효과 실행
  _startNeonSignEffect = (type) => {
    // 클럽 간판 글씨
    const { club_on, select_mode } = this.state;

    if(!club_on) {
      window.clearTimeout(neonSign_obj['sign']);
    }
    
    var target;
    if(type === 'sign') {
      target = document.getElementById('update_and_start').children[0]
    }

    action_fn(select_mode)
    //this._playNeonSignEffect(target, type, 0, neonSign_obj);
  }

  // 조명 효과
  _playNeonSignEffect = (target, type, num, obj) => {
    const { club_on, select_mode } = this.state;

    if(club_on) { 
      if(num > 4) {
          num = 0;
          window.clearTimeout(obj['sign'])

          this._playNeonSignEffect(target, type, num, obj);
      }

        obj['sign'] = window.setTimeout(() => {
          target.style.color = background.neonSign[num];
          num++;

          this._playNeonSignEffect(target, type, num, obj);
      }, 50)
    }
  }

  // 모드 선택
  _selectMode = (num) => {
    this.setState({ select_mode : num })
  }


  render() {
    const { _complateChange, _setPeople, _changeCharacter, _setCharNum, _changeClubOnState, _selectMode } = this;
    const { change, stage_people, char_num, club_on, light, neonSign } = this.state;

    return (
      <div>
        <Head 
          img={img} 
          change={change}
          _complateChange = {_complateChange}
          _setPeople = {_setPeople}
          _setCharNum = {_setCharNum}
          char_num = {char_num}
          _changeClubOnState={_changeClubOnState}
          _selectMode={_selectMode}
          club_on={club_on}
          light={light}
          neonSign={neonSign}
        />

        <Body 
          stage_people={stage_people}
          img={img}
          _changeCharacter={_changeCharacter}
          _setCharNum={_setCharNum}
          club_on={club_on}
        />
      </div>
    );
  }
}

export default App;