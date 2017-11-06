import React, { Component } from 'react';
import {css, StyleSheet} from 'aphrodite';
import DashBoard from './DashBoard';
class Container extends Component {

    render() {
        return (
            <div className={css(styles.contaier)}>
                <DashBoard />;
            </div>
        );
    }
}
const styles = StyleSheet.create({
    contaier: {
        display:'flex',
        justifyContent:'center',
        alignItems:'center',


    },

});
export default Container;