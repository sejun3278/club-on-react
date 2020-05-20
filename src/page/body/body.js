import React, { Component } from 'react';
import { Stage } from './index'

class body extends Component {
  render() {
      const { 
        stage_people, img, _changeCharacter, _setCharNum, club_on
      } = this.props;

    return (
        <div id='body'>
            <Stage 
              stage_people={stage_people}
              img={img}
              _changeCharacter={_changeCharacter}
              _setCharNum = {_setCharNum}
              club_on={club_on}
            />
        </div>
    );
  }
}

export default body;