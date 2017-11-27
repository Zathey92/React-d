import React, { Component } from 'react';
import moment from 'moment';
import ReactTooltip from 'react-tooltip'
import {css, StyleSheet} from 'aphrodite';

class GraphBar extends Component {

    render() {
        let identifier = this.props.userName+this.props.listName;
        let colorId = this.props.listName;
        return (
            <div>
                <a data-tip data-for={identifier} target="_blank" href={this.props.url} style={{minWidth:100,width:(this.props.width*25)+'%'}} className={css(styles.bar)}>
                    <div style={{backgroundColor:this.props.getColor(colorId)}} className={css(styles.border)}>
                        <div className={css(styles.text)}> {this.props.name}</div>
                    </div>
                </a>
                <ReactTooltip id={identifier} aria-haspopup={'true'} role='Sprint-info'>
                    <p><b>Persona: </b>{this.props.userName}</p>
                    <p><b>Proyecto: </b>{this.props.name}</p>
                    <ul>
                        <li>{'Sprint: '+this.props.listName }</li>
                        <li>{'Finalización: '+moment(this.props.due).format("DD/MM/YYYY") }</li>
                    </ul>
                </ReactTooltip>
            </div>


        );
    }
}
const styles = StyleSheet.create({
    bar:{
        display:'flex',
        justifyContent:'flex-start',
        height:'41px',
        textDecoration:'none',
    },
    text:{
        color:'whitesmoke',
        fontWeight:'bold',
        fontFamily:'Arial',
        marginLeft:'20px',
        textShadow: '2px 4px 3px rgba(0,0,0,0.1)',
},

    border: {

        display:'flex',
        justifyContent:'flex-start',
        width:'100%',
        alignItems:'center',
        margin:'3px 0px 3px 0px',
        borderRadius: '0px 10px 10px 0px',
        ':hover': {
            margin:'-1px -3px -1px -4px',
            border:'2px solid white',
        }
    },



});

export default GraphBar;