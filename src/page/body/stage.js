import React, { Component } from 'react';
import Modal from 'react-modal';

import { Selector } from './index'

const customStyles = {
    content : {
      top                   : '40%',
      left                  : '50%',
      right                 : '50%',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      width                 : "1000px"
    }
  };

class stage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal_status : false,
      select_character : 0,
    }
  }

  _openSeletor = (num) => {
    this.setState({ 
      modal_status : true,
      select_character : num
    })
  }

  _closeSelector = () => {
    this.setState({ modal_status : false })
  }

  _moveCharacterInfo = (num, type) => {
    // 앞 캐릭터 이동 클릭했을 경우
    if(type === 'pre') {
      if(num === 1) {
        return alert('첫번째 캐릭터입니다.')
      }
      this.setState({ select_character : num - 1 })

    } else if(type === 'next') {
      if(num === 15) {
        return alert('마지막 캐릭터입니다.')
      }

      this.setState({ select_character : num + 1 })
    }

    // 이동할 때 현재 상태 저장
  }

  _deleteCharacter = (num) => {
    const { stage_people, _setCharNum } = this.props;
    var profile = stage_people;

    if(profile[num] === 'empty') {
      return alert('이미 비어있는 캐릭터입니다.')
    }

    profile[num] = 'empty';
    _setCharNum('delete', 1)

    this.setState({ stage_people : profile })
  }

  _saveCharacter = (num) => {
    const { stage_people } = this.props;
    var profile = stage_people;

    if(profile[num] === 'empty') {
      return alert('해당 캐릭터는 비어있는 상태입니다.')
    }
  }

  render() {
    const { stage_people, img, _changeCharacter, club_on } = this.props;
    const { modal_status, select_character } = this.state;
    const { 
      _openSeletor, _closeSelector, _moveCharacterInfo, _deleteCharacter,
      _saveCharacter
    } = this;

    return (
        <div>
            <div className='stage_floor'>
                {stage_people.map( (el, key) => {
                  var char = img.character[el];

                  if(el !== 'empty') {
                    char = el;
                  }

                  return (
                    <div
                      onClick={!club_on ? () => _openSeletor(key + 1) : null}
                      id={key < 8 ? 'up_floor' 
                                  : 'down_floor'
                        }
                      key={key} 
                      style={
                        club_on ? {'backgroundImage' : `url(${char})`, 'border' : 'none', 'cursor' : 'default' }
                                : {'backgroundImage' : `url(${char})`}
                      }
                    >
                    </div> 
                    )
                  })}
            </div>
          
          {!club_on ?
            <Modal
              isOpen={modal_status}
              onRequestClose={_closeSelector}
              style={customStyles}
              contentLabel="selector"
            >
              <Selector 
                select_character={select_character}
                stage_people={stage_people}
                _closeSelector={_closeSelector}
                img={img}
                _moveCharacterInfo={_moveCharacterInfo}
                _deleteCharacter={_deleteCharacter}
                _saveCharacter={_saveCharacter}
                _changeCharacter={_changeCharacter}
              />
            </Modal>

            : null}


            {/* <div id='up_floor' className='stage_floor'>
                {stage_people.map( (el, key) => {
                    if(key < 8) {
                        return(
                            <div
                                key={key} 
                                style={{'backgroundImage' : `url(${img.character.el})`}}
                            >
                            </div>
                        )
                    }
                })}
            </div>

            <div id='down_floor' className='stage_floor'>
                {stage_people.map( function(el, key) {
                    if(key > 7 && key < 15) {
                        return(
                            <div 
                            key={key}
                            style={
                                el === 'empty' 
                                            ? { 
                                                'backgroundImage' : `url(${img.character.empty})`
                                              }
                                            : null}
                            >
                            </div>
                        )
                    }
                })}
            </div> */}
        </div>
    );
  }
}

export default stage;