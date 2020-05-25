import React, { Component } from 'react';
import img from '../../img.json';
import help_list from '../../json/help.json';

class help extends Component {
    constructor(props) {
        super(props)
        this.state = {
          page : 1,
        }
      }

    _movePage = (type) => {
        const { page } = this.state;

        if(type === 'pre') {
            if(page === 1) {
                return alert('첫번째 페이지입니다.');
            }
            this.setState({ page : page - 1 })

        } else if(type === 'next') {
            if(page === 5) {
                return alert('마지막 페이지입니다.');
            }
            this.setState({ page : page + 1 })
        }
    }

  render() {
    const { _toggleHelpModal } = this.props;
    const { page } = this.state;

    let help_data = help_list.help[page];

    return (
        <div>
            <img src={img.other.help} id='help_modal_icon'/>
            <h3 id='help_title'> How to play the <b style={{ 'color' : '#bb596b' }}> Club On? </b> </h3>

          <div id='help_close_icon'>
            <img src={img.other.close}
                title='닫기' alt=''
                onClick={() => _toggleHelpModal(false)}
            />
          </div>

          <div id='help_contents'>
            {/* 앞으로 이동 */}
            <div> 
                <img
                    className='pre_and_next'
                    onClick={() => this._movePage('pre')}
                    title='이전 내용으로' alt=''
                    src={page > 1 ? img.other.pre : img.other.pre_close}
                /> 
            </div>

            <div
                id='help_contents_img'
                style={{ 'backgroundImage' : `url(${help_data.img})` }}
            >

            </div>

            <div id='help_next_icon'> 
                <img
                    className='pre_and_next'
                    onClick={() => this._movePage('next')}
                    title='다음 내용으로' alt=''
                    src={page < 5 ? img.other.next : img.other.next_close}
                /> 
            </div>
          </div>
            
            <div id='comment_div'>
                <div id='page_notice'> {page} </div>
                <div id='help_comment'
                    dangerouslySetInnerHTML={{__html : help_data.comment}}
                >
                </div>
            </div>
        </div>
    );
  }
}

export default help;