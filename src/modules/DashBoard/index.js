import React, { Component } from 'react';
import {css, StyleSheet} from 'aphrodite';
import { Progress } from 'antd';
//import ReactLoading from 'react-loading';
import DashTable from "./table";
import {fetchDashBoard} from "./actions/index";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

class DashBoard extends Component {

    componentDidMount(){
        this.props.fetchDashBoard();
    }
    loadContent(){
        const progress = (percent,status="active") =>{
            return <div className={css(styles.progress)}>
                <Progress type="dashboard" status={status} percent={percent} />
            </div>
        };
        if(this.props.isLoading){
            //return <ReactLoading color={'#6666ff'}/>;
            switch (this.props.step){
                case 0:
                    return progress(0);
                case 1:
                    return progress(20);
                case 2:
                    return progress(40);
                case 3:
                    return progress(60);
                case 4:
                    return progress(80);
                case 5:
                    return progress(100,"success");
                default:
                    return progress(100,"exception");
            }
        }else if(this.props.isLoaded){
            return <DashTable />;
        }else{
            return <h2>Error</h2>
        }
    }


    render() {
        return (
            <div className={css(styles.container)}>
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
    progress: {
        paddingTop:'250px',
    },

});
function mapDispatchToProps(dispatch){
    return bindActionCreators({ fetchDashBoard }, dispatch)
}
function mapStateToProps(state) {
    return {
        isLoading: state.trello.isLoading,
        isLoaded: state.trello.isLoaded,
        step: state.trello.step,
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(DashBoard);