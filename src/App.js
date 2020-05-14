import React, { Component } from 'react';
import './App.css';
import img from './img.json';

// 헤드 부분
import Head from './page/head/head'

// 바디 부분
import Body from './page/body/body'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
        change : false,
        up_stage : new Array()
    }
  }

  // change state를 true로 변경
  _complateChange = () => {
    this.setState({ change : true })
  }

  render() {
    const { _complateChange } = this;
    const { change, up_stage } = this.state;

    return (
      <div>
        <Head 
          img={img} 
          change={change}
          _complateChange = {_complateChange}
        />
        <Body 
          up_stage={up_stage}
        />
      </div>
    );
  }
}

export default App;