import React, { Component } from 'react';
import select_data from '../../json/select.json';

class selector extends Component {
    constructor(props) {
        super(props)
        this.state = {
          modal_status : false,
        }
      }

    render() {
        const { 
            select_character, stage_people, img, _closeSelector,
            _moveCharacterInfo, _deleteCharacter, _changeCharacter,
        } = this.props;

        // 캐릭터 프로필 구성
        var profile, search_char_info;
        var origin_select_type, origin_select_acce, origin_select_hat;

        // 캐릭터 유형 값이 null 일 경우 악세사리 및 모자 선택 불가
        var click_allow = true;

        if(stage_people[select_character - 1] === 'empty') {
            profile = img.character.empty;
            click_allow = false;

        } else {
            profile = stage_people[select_character - 1];

            // 현재 선택된 캐릭터의 유형 구하기
            search_char_info = profile.slice((profile.indexOf('.com/') + 5), (profile.length - 4));
            search_char_info = (search_char_info.split('-'));

            origin_select_type = Number(search_char_info[0]);
            origin_select_acce = Number(search_char_info[1]);
            origin_select_hat = Number(search_char_info[2]);
        }

        return (
            <div id='charator_selector'>
                <div id='selector_other'>
                    <img id='pre' src={select_character === 1 ? img.other.pre_close : img.other.pre} title='앞 캐릭터로 이동' alt=''
                        onClick={() => _moveCharacterInfo(select_character, 'pre')}
                    />

                    <h3 id='select_title'> {select_character}번　캐릭터 선택 </h3>
                    <img id='next' src={select_character === 15 ? img.other.next_close : img.other.next} title='뒤 캐릭터로 이동' alt=''
                        onClick={() => _moveCharacterInfo(select_character, 'next')}
                    />

                    <img id='close' src={img.other.close} title='닫기' alt=''
                        onClick={() => _closeSelector()}
                    />
                </div>

                <div id='selector_body'>
                    <div id='char_profile'>
                        <div
                            id='choice_char_profile' 
                            style={{'backgroundImage' : `url(${profile})`}}
                        >
                        </div>
                        
                        <div id='choice_char_opt'>
                            <div onClick={() => _deleteCharacter(select_character - 1)}
                                style={stage_people[select_character - 1] === 'empty' ? 
                                    {'color' : '#ababab'} : null
                                }
                            >
                                삭제 
                            </div>

                            {/* <div onClick={() => _saveCharacter(select_character - 1)}
                                style={stage_people[select_character - 1] === 'empty' ? 
                                    {'color' : '#ababab'} : null
                                }
                            >
                                저장 
                            </div> */}
                        </div>
                    </div>

                    <div id='choice_char'>
                        <ul>
                            {/* 캐릭터 유형 */}
                            <li> <h4> 캐릭터 유형 <b style={{ 'color' : 'red' }}>(* 필수)</b> </h4> 
                                <ul id='choice_type'>
                                {select_data.select.character_type.map( (el, key) => {
                                    const type_img = img.character[key + 1][0][0][0];
                                    const check_same = origin_select_type === (key + 1);

                                    return(
                                        <li 
                                            key={key}
                                            title={el[0][key + 1].name}
                                            //style={{ 'backgroundImage' : `url(${type_img})` }}
                                            style={ check_same
                                                ? { 'border' : 'double thick #9a1f40', 'backgroundImage' : `url(${type_img})` } 
                                                : { 'backgroundImage' : `url(${type_img})` }
                                            }

                                            onClick={ !check_same
                                                ? () => _changeCharacter('char', select_character - 1, key + 1, search_char_info, null)
                                                : null }
                                        >
                                        </li>
                                    )
                                })}
                                </ul>
                            </li>

                            {/* 악세사리 */}   
                            <li> <h4 style={!click_allow ? {'color' : '#ababab'} : null}> 악세사리 </h4>  
                                <ul id='choice_acce'>
                                {select_data.select.character_acce.map( (el, key) => {
                                    const acce_img = el[0][key + 1].img;
                                    const check_same = origin_select_acce === (key + 1);

                                    return(
                                        <li
                                            key={key}
                                            title={el[0][key + 1].name}
                                            style={ check_same
                                                ? { 'border' : 'solid 2px #fc8210', 'backgroundImage' : `url(${acce_img})` } 
                                                : { 'backgroundImage' : `url(${acce_img})` }
                                            }
                                            className={!click_allow ? 'click_allow' : null}

                                            onClick={ !check_same
                                                ? () => _changeCharacter('acce', select_character - 1, key + 1, search_char_info, true)
                                                : () => _changeCharacter('acce', select_character - 1, key + 1, search_char_info, false)}
                                        >
                                        </li>
                                    )
                                })}
                                </ul>
                            </li>

                            {/* 모자 */}   
                            <li> <h4 style={!click_allow ? {'color' : '#ababab'} : null}> 모자 </h4>  
                                <ul id='choice_hat'>
                                {select_data.select.character_hat.map( (el, key) => {
                                    const hat_img = el[0][key + 1].img;
                                    const check_same = origin_select_hat === (key + 1);
                                    
                                    return(
                                        <li
                                            key={key}
                                            title={el[0][key + 1].name}
                                            style={ check_same
                                                ? { 'border' : 'solid 2px #fc8210', 'backgroundImage' : `url(${hat_img})` } 
                                                : { 'backgroundImage' : `url(${hat_img})` }
                                            }
                                            className={!click_allow ? 'click_allow' : null}

                                            onClick={ !check_same
                                                ? () => _changeCharacter('hat', select_character - 1, key + 1, search_char_info, true)
                                                : () => _changeCharacter('hat', select_character - 1, key + 1, search_char_info, false) }
                                        >
                                        </li>
                                    )
                                })}
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
    }

    export default selector;