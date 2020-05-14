import React, { Component } from 'react';
import { Logo, Start, Setting } from './index'

var timeoutMent;
class head extends Component {
    // 배치 버튼 클릭
    _clickSet = (type) => {
        const { change, _complateChange } = this.props;

        var select = '기본 배치';
        if(type === 'random') {
        // 랜덤 배치
            select = '랜덤 배치';
        }

        if(change) {
            if(!window.confirm(select + '를 하면 배치된 손님들이 재구성됩니다. \n재구성 할까요?')) {
                return;
            }
        }
        
        window.clearTimeout(timeoutMent);
        _complateChange();
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

    // 배치하기
    _setCharactor = function(type) {
        // 기본 배치
        if(type === 'basic') {

        } 
        // 랜덤 배치
        else if(type === 'random') {

        }
    }

  render() {
    const { img } = this.props;
    const { _clickSet } = this; 

    return (
        <div id='header'>
            <Logo />
            <Start img={img} />
            <Setting 
                img={img}
                _clickSet={_clickSet}
            />
        </div>
    );
  }
}

export default head;