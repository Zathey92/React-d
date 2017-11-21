import React, { Component } from 'react';
import {css, StyleSheet} from 'aphrodite';
import DashBoard from './DashBoard';
import {authorize} from "./DashBoard/actions/index";
import connect from "react-redux/es/connect/connect";
import bindActionCreators from "redux/es/bindActionCreators";
class Container extends Component {

    componentDidMount(){
        if(!this.props.isAuthorized){
            this.props.authorize();
        }
    }
    content(){
        if(!this.props.isAuthorized) return <h2>Esperando Authorización</h2>;
        return <DashBoard/>
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
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Container);