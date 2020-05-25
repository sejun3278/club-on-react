import React, { Component } from 'react';
import img from '../../img.json';

class help extends Component {
    constructor(props) {
        super(props)
        this.state = {
          page : 1,
        }
      }

  render() {
    const { _toggleHelpModal } = this.props;

    return (
        <div>
          <h3 id='help_title'> 게임 설명 </h3>

          <div id='help_close_div'>
            <img src={img.other.close}
                title='닫기' alt=''
                onClick={() => _toggleHelpModal(false)}
            />
          </div>
        </div>
    );
  }
}

export default help;