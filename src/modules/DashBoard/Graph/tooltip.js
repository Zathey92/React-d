import React, { Component } from 'react';
import {css, StyleSheet} from 'aphrodite';

class Tooltip extends Component {


    render() {
        return (
            <div className={css(styles.container)}>
                Tooltip
            </div>
        );
    }
}
const styles = StyleSheet.create({
    tooltip: {
    textDecoration:'none',
    position:'relative',
    },

    hover:{
        ':hover':{
            display:'block',
            position:'fixed',
            overflow:'hidden',
        }
    },


});


export default Tooltip;