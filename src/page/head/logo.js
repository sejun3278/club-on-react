import React, { Component } from 'react';

class logo extends Component {
    render() {
        return(
            <div id='make_logo'
                className={!this.props.light ? 'light_off' : null}
            >
                <h1> 1. Club On </h1>
                <p> HTML, CSS, <u> React </u> </p>
                <p> ( Made in Sejun3278 ) </p>
            </div>
        )
    }
}

export default logo;