import React, { Component } from 'react';
import {css, StyleSheet} from 'aphrodite';

class GraphBar extends Component {

    render() {
        //console.log("width: "+this.props.width+" name: " +this.props.name+ " color: "+ this.props.getColor(this.props.name+this.props.width));
        return (

            <a target="_blank" href={this.props.url} style={{minWidth:100,width:(this.props.width*25)+'%'}} className={css(styles.bar,styles.hover)}>
                <div style={{backgroundColor:this.props.getColor(this.props.name+this.props.width)}} className={css(styles.border)}>
                    <div className={css(styles.text)}> {this.props.name}</div>
                </div>
            </a>


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
        fontFamily:'sans serif',
        marginLeft:'20px',
        textShadow: '2px 4px 3px rgba(0,0,0,0.1)',
},
    hover: {
        ':hover': {

            //padding: '2px 0px 2px 0px',
            //margin:'2px 0px 3px 0px',

            //webkitBoxShadow:'0 4px 2px -2px rgba(0,0,0,0.4)',
            //mozBoxShadow: '0 4px 2px -2px rgba(0,0,0,0.4)',
            //boxShadow: '0 4px 2px -2px rgba(0,0,0,0.4)',
        }
    },
    border: {

        display:'flex',
        justifyContent:'flex-start',
        width:'100%',
        alignItems:'center',
        //height:'100%',
        margin:'3px 0px 3px 0px',
        borderRadius: '0px 10px 10px 0px',
        ':hover': {
            margin:'-1px -3px -1px -4px',
            border:'2px solid white',
            //padding:'1px 0px 0px 0px',
            //webkitBoxShadow:'0 4px 2px -2px rgba(0,0,0,0.4)',
            //mozBoxShadow: '0 4px 2px -2px rgba(0,0,0,0.4)',
            //boxShadow: '0 4px 2px -2px rgba(0,0,0,0.4)',
        }
    },



});

export default GraphBar;