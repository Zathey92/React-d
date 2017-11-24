import React from 'react';
import {css, StyleSheet} from 'aphrodite';
import {logout} from "../DashBoard/actions/index";
import bindActionCreators from "redux/es/bindActionCreators";
import connect from "react-redux/es/connect/connect";
import {Component} from "react/cjs/react.production.min";

class Logout extends Component{
    render(){
        if(!this.props.isAuthorized) return (<div></div>);
        return (
            <div>
                {this.props.username+"   "}
                <a className={css(styles.logout)} onClick={this.props.logout}>(Log out) </a>
            </div>);
    }
}
const styles = StyleSheet.create({
    logout:{
        alignSelf:'center',
        cursor: 'pointer',
        fontSize:'0.8em',
    },
});

function mapDispatchToProps(dispatch){
    return bindActionCreators({ logout }, dispatch)
}
function mapStateToProps(state) {
    return {
        isAuthorized:state.trello.isAuthorized,
        username:state.trello.username,
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Logout);