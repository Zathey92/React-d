import React, { Component } from 'react';
import {css, StyleSheet} from 'aphrodite';
import ReactLoading from 'react-loading';
import DashTable from "./table";
import {fetchDashBoard} from "./actions/index";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

class DashBoard extends Component {
    constructor(){
        super();
        this.state = {
            isLoading:false,

        }
    }
    componentDidMount(){
        this.props.fetchDashBoard();
    }
    loadContent(){
        if(this.props.isLoading){
            return <ReactLoading color={'#6666ff'}/>;
        }else{
            return <DashTable />;
        }
    }


    render() {
        return (
            <div className={css(styles.container)}>
                {this.props.isLoading}
                {this.loadContent()}
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
    return bindActionCreators({ fetchDashBoard }, dispatch)
}
function mapStateToProps(state) {
    return {
        isLoading: state.trello.isLoading,
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(DashBoard);