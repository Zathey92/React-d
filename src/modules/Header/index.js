import React from 'react';
import {css, StyleSheet} from 'aphrodite';
const Header= (props)=> {

    return (
        <div className={css(styles.flex,styles.container)}>
            <div className={css(styles.flex,styles.productTitle)}>
                Dallo
            </div>
            <div className={ css(styles.flex,styles.title)}>
                DashBoard
            </div>
            <div className={css(styles.flex,styles.nav)}>

            </div>
        </div>
    );
};
const styles = StyleSheet.create({
    flex: {
        display: 'flex',

    },
    container: {
        justifyContent: 'space-between',
        //backgroundColor:'#858585',
        backgroundColor:'#6666ff',
        flexDirection:'row',
        padding:'8px',
        color:'white',
    },
    productTitle: {
        flex:'1',
    },
    title: {

        justifyContent:'center',

        flex:'1',
    },
    nav: {
        flex:'1',
    },

});
export default Header;