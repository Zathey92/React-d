import React, { Component } from 'react';
import {css, StyleSheet} from 'aphrodite';

import 'antd/lib/table/style/css.js';
import DashRow from "./row";
import DashHeader from "./header";

class DashTable extends Component {

    constructor(props){
        super(props);
        this.state = {
            reload: true,
        }
    }

    render() {

        const rows = (data)=>{
            let rows = [];
            for (var name in data){
                rows.push(<DashRow key={ name } name={ name } data={ data[name] } />);
            }
            return rows;
        };


        return (
            <div className={ css(styles.wrapper) }>
                <div className={ css(styles.table) }>
                    <DashHeader maxMonth={ this.props.maxMonth } />
                    { rows(this.props.data) }
                </div>
            </div>
        );
    }
}
const styles = StyleSheet.create({

    table:{
        display:'flex',
        flexDirection:'column',
        overflow:'auto',
        width:'100%',



},
    wrapper:{
        display:'flex',
        width:'100%',

    }


});

export default DashTable;