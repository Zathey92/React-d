import React, { Component } from 'react';
import {css, StyleSheet} from 'aphrodite';
import { Table } from 'antd';
import 'antd/lib/table/style/css.js';
import {connect} from "react-redux";
import moment from "moment";

class DashTable extends Component {

    constructor(props){
        super(props);
        this.state = {
            reload: true,
        }
    }

    componentDidMount(){
       window.dispatchEvent(new Event('resize'));
    }

    render() {
        const cell = (boards) => {
            let cell = boards.map((boardName)=>{
                return project(boardName[0],boardName[1])
            });
            return (<div className={css(styles.cell)}>{cell}</div>);

        };
        const project = (boardName, url) => {
            return (<a href={ url } target="_blank" className={ css(styles.con) }>{boardName}</a>);
        };
        const monthColumn = (month)=> {
            return {title:<div className={css(styles.center)}>{month}</div>, dataIndex:month, key:month,};
        };
        const columns = (maxMonth)=>{
            let aux = moment().format("MMMM-YY");
            let columns = [{title:<div className={css(styles.center)}>Name</div>, width:150, dataIndex:'name', key:'name', fixed:'left'}];
            while(aux!==maxMonth){
                columns.push(monthColumn(aux));
                aux = moment(aux,"MMMM-YY").add(1,"month").format("MMMM-YY");
            }
            return columns;

        };

        const tableData=(data)=>{
            for(let member of data){
                for(let month of Object.keys(member)){
                    if(month!=='name'&&month!=='key'){
                        let boardsName=[]
                        let boards = member[month];
                        for(let boardId of Object.keys(boards)){
                            boardsName.push([boards[boardId].bname,boards[boardId].url]);
                        }
                        member[month]=cell(boardsName)
                    }else{
                        member[month] = <div className={css(styles.name)}>{member[month]}</div>
                    }
                }
            }
            return data;
        };

        return (
            <div className={ css(styles.co) }>
                <Table columns={ columns(this.props.maxMonth) } dataSource={ tableData(this.props.data) } scroll={{ x: 800 }} />
            </div>
        );
    }
}
const styles = StyleSheet.create({
    co: {

        width:'100%',
    },
    con:{
        backgroundColor:'orange',
        color:'white',
        marginTop:'5px',
        padding:'15px 5px 15px 5px',
        borderRadius: '25px',
        textAlign:'center',
        marginLeft:'-55px',
        alignContent:'top',


    },
    cell:{
        display:'flex',
        flexDirection:'column',


    },
    name:{
        fontSize:'1.2em',
        textAlign:'center',
    },
    center:{
        textAlign:'center',
    }


});
function mapStateToProps(state) {
    return {
        data: state.trello.data,
        maxMonth: state.trello.maxMonth,
    };
}
export default connect(mapStateToProps)(DashTable);