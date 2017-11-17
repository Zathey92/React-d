import React from 'react';
import {css, StyleSheet} from 'aphrodite';
const Header= (props)=> {

    return (
        <div className={css(styles.container)}>
            <div className={css(styles.productTitle)}>
                Dallo
            </div>
            <div className={ css(styles.title)}>
                DashBoard
            </div>
            <div className={css(styles.nav)}>

            </div>
        </div>
    );
};
const styles = StyleSheet.create({
    container: {
        display:'flex',
        justifyContent: 'space-between',
        //backgroundColor:'#858585',
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
        flex:'1',
    },

});
export default Header;