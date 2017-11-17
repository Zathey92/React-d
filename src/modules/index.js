import React, { Component } from 'react';
import {css, StyleSheet} from 'aphrodite';
import DashBoard from './DashBoard';
class Container extends Component {

    render() {
        return (
            <div className={css(styles.container)}>
                <DashBoard />
            </div>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        width:'100%',

    },

});
export default Container;