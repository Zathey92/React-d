import React, { Component } from 'react';
import {css, StyleSheet} from 'aphrodite';


class DashBar extends Component {

    constructor(props){
        super(props);
        this.state={
            width: '25%',
            minWidth: '240px',
        }
    }

    componentDidMount(){
        //let width = document.getElementById('date').offsetWidth * 3;
        this.setState({width: this.props.width });
    }

    render() {


        return (
            <div style={{minWidth: this.state.minWidth, width:this.state.width}} className={ css(styles.bar) }>
                Pepe
            </div>
        );
    }
}
const styles = StyleSheet.create({

    bar:{
        backgroundColor:'red',
    },

});

export default DashBar;