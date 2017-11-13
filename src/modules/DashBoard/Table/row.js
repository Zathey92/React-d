import React, { Component } from 'react';
import {css, StyleSheet} from 'aphrodite';
import DashBar from "./bar";


class DashRow extends Component {

    render() {

        return (
            <div className={css(styles.pepe)}>
                <div className={ css(styles.row) }>
                    <div className={ css(styles.name) }>{ this.props.name }</div>
                    <div className={ css(styles.barBox) }><DashBar width={ '25%' } data={ this.props.data }/></div>
                </div>
            </div>
        );
    }
}
const styles = StyleSheet.create({

    row:{
        display:'flex',
        flexDirection:'row',
        minWidth:'600px',
        backgroundColor:'whitesmoke',

    },
    barBox:{
        display:'flex',
        flexDirection:'row',
        width:'85%',
    },
    name:{
        display:'flex',
        width:'15%',
        minWidth:'120px',

    },




});

export default DashRow;