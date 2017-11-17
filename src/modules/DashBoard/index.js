import React, { Component } from 'react';
import {css, StyleSheet} from 'aphrodite';
import { Progress } from 'antd';
import {fetchDashBoard} from "./actions/index";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Graph from "./Graph/graph";

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
            if(this.props.data.length==0){
                return <div><h2 style={{textAlign:'center'}}>No hay datos que Mostrar</h2><p>Compruebe que exista en Trello <b>tareas</b>, <b>usuarios</b>, y una <b>dueDate</b> mayor que la fecha actual.</p></div>
            }
            return <Graph minWidth={110} maxMonth={ this.props.maxMonth } data={ this.props.data }/>;
            //return <DashTable />;
        }else{
            return progress(0);
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
        alignSelf:'center',
        width:'90%',
        marginTop:'20px',


    },
    progress: {
        paddingTop:'220px',
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
        data: state.trello.data,
        maxMonth: state.trello.maxMonth,
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(DashBoard);