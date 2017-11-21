import React, { Component } from 'react';
import {css, StyleSheet} from 'aphrodite';
import GraphBar from "./graphBar";

class GraphGroup extends Component {

    loadGroup =(props)=>{
        //console.log(this.props.width*100);
        return props.data.map((bar)=>{
            //return(<div  className={css(styles.bar)} style={{width:(bar.value*20)+'%'}}>{bar.name}</div>);
            return <GraphBar style={{width:(this.props.width*25+"%"),minWidth:(this.props.width*100)}} getColor={props.getColor} key={bar.name+bar.value} url={bar.url} width={bar.value} name={bar.name}/>
        });
    };

    render() {

        return (
            <div className={css(styles.group,styles.hover)}>
                {this.loadGroup(this.props)}
            </div>


        );
    }
}
const styles = StyleSheet.create({
    group:{
        display:'flex',
        padding:'5px 0px 5px 0px',
        flexDirection:'column',



        //borderBottom:'1px solid',
    },
    hover: {
        ':hover': {
            backgroundColor: '#dedede'
        }
    },

});

export default GraphGroup;