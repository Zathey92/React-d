import React from 'react';
import {css, StyleSheet} from 'aphrodite';
import {Component} from "react/cjs/react.production.min";
import Logout from './logout';
import Link from "react-router-dom/es/Link";
import connect from "react-redux/es/connect/connect";
import bindActionCreators from "redux/es/bindActionCreators";
import {fetchDashboard} from "../DashBoard/actions/index";

class Header extends Component{

    render() {
        const homeAction = ()=>{
            if(!this.props.isAuthorized){
                this.props.authorize();
                this.props.fetchDashboard();
            }
            this.props.fetchDashboard();

        };
        return (
            <div className={css(styles.container)}>
                <Link onClick={homeAction.bind(this)} to='/' className={css(styles.productTitle)}>Dallo</Link>
                <div className={css(styles.title)}>
                    DashBoard
                </div>
                <div className={css(styles.nav)}>
                    <Logout/>
                </div>
            </div>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        fontFamily:'Ubuntu, sans-serif',
        fontSize:'1.2em',
        display:'flex',
        justifyContent: 'space-between',
        backgroundColor:'#6666ff',
        flexDirection:'row',
        padding:'10px',
        color:'white',
        overflow:'hidden',
    },
    productTitle: {
        flex:'1',
        display:'flex',
        textDecoration:'none',
        color:'white',

    },
    title: {
        display:'flex',
        justifyContent:'center',
        flex:'1',
    },
    nav: {
        display:'flex',
        justifyContent:'flex-end',
        textDecoration:'none',
        flex:'1',
    },

});
function mapDispatchToProps(dispatch){
    return bindActionCreators({ fetchDashboard }, dispatch)
}
export default connect(null,mapDispatchToProps)(Header);