import React, { Component } from 'react';
import {css, StyleSheet} from 'aphrodite';

class GraphXLabel extends Component {

    render() {

        return (
            <div style={{minWidth:this.props.minWidth}} className={css(styles.label)}>
                {this.props.name}
            </div>


        );
    }
}
const styles = StyleSheet.create({
    label:{
        fontFamily: 'Lato',
        fontWeight:'bold',
        display:'flex',
        width:'25%',
        justifyContent:'center',
        margin:'5px 0px 5px 0px',
        borderRight:'solid'

    },


});

export default GraphXLabel;