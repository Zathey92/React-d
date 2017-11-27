import React, { Component } from 'react';
import {css, StyleSheet} from 'aphrodite';
import DashBoard from './DashBoard';
import {authorize} from "./DashBoard/actions/index";
import connect from "react-redux/es/connect/connect";
import bindActionCreators from "redux/es/bindActionCreators";
import axios from 'axios';

class Container extends Component {
    componentDidMount(){
        if(!this.props.isAuthorized){
            this.props.authorize();
        }
    }
    componentUnMount(){
        axios.Cancel('request');
    }
    content(){
        if(this.props.isAuthorized) return <DashBoard/>
        if(this.props.isWaitingAuth) return <div style={{textAlign:'center'}}><h2 >Esperando Autorización</h2><p>Si no se ha abierto trello, <b style={{cursor: 'pointer'}} onClick={this.props.authorize}>click aquí</b></p></div>;

    }
    render() {
        return (
            <div className={css(styles.container)}>
                {this.content()}
            </div>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        width:'100%',

    },

});
function mapDispatchToProps(dispatch){
    return bindActionCreators({ authorize }, dispatch)
}
function mapStateToProps(state) {
    return {
        isAuthorized: state.trello.isAuthorized,
        isLoadingAuth:state.trello.isLoadingAuth,
        isWaitingAuth:state.trello.isWaitingAuth,
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Container);