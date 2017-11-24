import React, { Component } from 'react';
import {css, StyleSheet} from 'aphrodite';
import moment from "moment";
import GraphXLabel from "./graphXLabel";
import GraphYLabel from "./graphYLabel";
import GraphGroup from "./graphGroup";

/*
var colors={

    '#067bc2':false,
    '#d56062':false,
    '#84bcda': false,
    '#ecc30b':false,
    '#f37748':false,

};
     */
var colors={
    '#727272':false,
    '#f1595f':false,
    '#79c36a': false,
    '#599ad3':false,
    '#f9a65a':false,
    '#9e66ab':false,
    '#cd7058':false,
    '#d77fb3':false,
};
const selectedColors={};
const getColor=(sprint)=>{
    if(sprint in selectedColors){
        //console.log("selected: "+selectedColors[sprint]+" name: "+sprint);
        return selectedColors[sprint];
    }else{
        for(let color in colors){
            if(!colors[color]){
                selectedColors[sprint]=color;
                colors[color]=true;
                return color
            }
        }
        for(let color in colors){
            colors[color]=false;
        }
        return getColor(sprint);
    }
};

const getGraphData = (data,width,minWidth)=>{
    let groups = [];
    let labels = [];
    for(let i in data){
        let user = data[i];
        let name = user.name;
        let groupData = user.sprints.map((sprint)=>{
            //console.log(sprint);
            return {
                name:sprint.project,
                url:sprint.url,
                value:sprint.monthsFromNow+1,
            }
        });
        groups.push(<GraphGroup minWidth={minWidth} width={width} getColor={getColor} key={name} data ={groupData} />);
        labels.push(<GraphYLabel key={name} name={name} number={groupData.length}/>);
    }
    return [groups,labels];
};
const getXLabels = (maxMonth,minWidth)=>{
    let months = [];
    let now = moment().format("MMMM-YY");
    while(moment(now,"MMMM-YY")<=moment(maxMonth,"MMMM-YY")){
        let label = <GraphXLabel minWidth={minWidth} key={now} name={now}/>
        months.push(label);
        now = moment(now,"MMMM-YY").add(1,"month").format("MMMM-YY");
    }
    return months;
};

class Graph extends Component {

    render() {
        let minWidth = this.props.minWidth;
        let xLabels= getXLabels(this.props.maxMonth,minWidth);
        let graphData = getGraphData(this.props.data,xLabels.length,minWidth);
        let yLabels=graphData[1];
        let groupData=graphData[0];
        return (
            <div style={{marginLeft:minWidth}} className={css(styles.graph)}>
                <div style={{width:(xLabels.length*25+"%"),minWidth:(xLabels.length*minWidth)}} className={css(styles.xAxis)}>
                    {xLabels}
                </div>
            <div className={css(styles.content)}>
                <div style={{width:minWidth}} className={css(styles.yAxis)}>
                    {yLabels}
                </div>
                <div style={{width:(xLabels.length*25+"%"),minWidth:(xLabels.length*minWidth)}} className={css(styles.bars)}>
                    {groupData}
                </div>
            </div>
            </div>

        );
    }
}
const styles = StyleSheet.create({
    graph:{
        display:'flex',
        flexDirection:'column',
        width:'100%',
        overflow:'auto',


    },
    content:{
        display:'flex',
        width:'100%',
        flexDirection:'row',
        maxHeight:'50%',
    },
    xAxis:{
        display:'flex',
        width:'100%',
        borderBottom:'solid',


    },
    yAxis:{
        position:'absolute',
        left:'5%',
        borderRight:'solid',

    },
    bars:{
        width:'100%',
    },


});

export default Graph;