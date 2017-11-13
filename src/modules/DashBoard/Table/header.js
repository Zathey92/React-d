import React, { Component } from 'react';
import {css, StyleSheet} from 'aphrodite';
import moment from 'moment';


class DashHeader extends Component {

    render() {
        const dates = (maxMonth)=>{
            let divs = [];
            let now = moment().format("MMMM-YY");
            while(moment(now,"MMMM-YY")<=moment(maxMonth,"MMMM-YY")){
                let div = <div key={ now } className={ css(styles.date) }> { now } </div>
                divs.push(div);
                now = moment(now, "MMMM-YY").add(1,'month').format("MMMM-YY") ;
            }

            return divs;
        };

        return (
                <div className={ css(styles.header) }>
                    <div className={ css(styles.name) }>Name</div>
                    <div className={ css(styles.dates) }>
                        { dates(this.props.maxMonth) }
                    </div>
                </div>
        );
    }
}
const styles = StyleSheet.create({

    header:{
        display:'flex',
        flexDirection:'row',
        minWidth:'600px',
        backgroundColor:'gray',
    },
    name:{
        display:'flex',
        minWidth:'120px',
        width:'15%',

    },
    date:{
        width:'25%',
        minWidth:'120px',
    },
    dates:{
        display:'flex',
        flexDirection:'row',
        width:'85%',
    },

});

export default DashHeader;