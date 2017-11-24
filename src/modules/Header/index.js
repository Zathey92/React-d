import React from 'react';
import {css, StyleSheet} from 'aphrodite';
import {Component} from "react/cjs/react.production.min";
import Logout from './logout';

export default class Header extends Component{

    render() {

        return (
            <div className={css(styles.container)}>
            <div className={css(styles.productTitle)}>
                Dallo
            </div>
            <div className={css(styles.title)}>
                DashBoard
            </div>
            <div className={css(styles.nav)}>
                <Logout/>
            </div>
        </div>);
    }
}
const styles = StyleSheet.create({
    container: {
        display:'flex',
        justifyContent: 'space-between',
        backgroundColor:'#6666ff',
        flexDirection:'row',
        padding:'8px',
        color:'white',
        overflow:'hidden',
    },
    productTitle: {
        flex:'1',
        display:'flex',

    },
    title: {
        display:'flex',
        justifyContent:'center',
        flex:'1',
    },
    nav: {
        display:'flex',
        justifyContent:'flex-end',
        textDecoration:'none',
        flex:'1',
    },

});
