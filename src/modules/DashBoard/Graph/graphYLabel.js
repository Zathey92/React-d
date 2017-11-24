import React, { Component } from 'react';
import {css, StyleSheet} from 'aphrodite';

class GraphYLabel extends Component {

    render() {

        return (
            <div style={{height:(this.props.number)*41+10}} className={css(styles.label)}>
                <div className={css(styles.text)}>
                {this.props.name}
                </div>
                <div className={css(styles.gap)}>
                </div>
            </div>


        );
    }
}
const latoFont = {
    fontFamily: "Lato",
    fontStyle: "normal",
    fontWeight: "normal",
    src: "url('Lato.woff2') format('woff2')"
};
const styles = StyleSheet.create({
    label:{
      display:'flex',
      width:'100%',
        flexDirection:'row',
    },
    text:{
        fontFamily: [latoFont, "sans-serif"],
        justifyContent:'center',
        alignItems:'center',
        display:'flex',
        width:'95%',
        height:'100%',
    },
    gap:{
        display:'flex',
        flexDirection:'row',
        Height:'100%',
        minWidth:'1px',
        paddingRight:'5%',
        borderBottom:'1px solid',
        borderTop:'1px solid',
        borderLeft:'1px solid',
        margin:'8px 0 8px 0',

    },


});

export default GraphYLabel;