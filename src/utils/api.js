import moment from "moment";
import {
    AUTHORIZE, FETCH_DASHBOARD_ERROR, FETCH_DASHBOARD_STEP,
    WAITING_AUTHORIZATION
} from "../modules/DashBoard/actions/index";
import * as axios from "axios";

const API_KEY = 'c7300c59c78515316cd1119c65207467';
//const API_KEY2 = '3c4fe1a2ccaca8c8ac6270a0bdf36733';
//const API_TOKEN2='6b7a5c38f46c6fbd29a0a69004cac54f019e16e1de8e3c6397004c06a0bb0874';
//const API_TOKEN='4fe745010a3021bcc2c1b8adcab1f8cab0b0708c828647949ed43fdd4fb46c55';
var API_TOKEN;

export const trello = {

    async get(uri,params){
        this.source=axios.CancelToken.source();
        let url;
        if(params===undefined){
            url=`https://api.trello.com/1/${uri}?key=${API_KEY}&token=${API_TOKEN}`;
        }else{
            url=`https://api.trello.com/1/${uri}?${params}&key=${API_KEY}&token=${API_TOKEN}`;
        }
        let retries = 0;
        let response;
        while(retries<20) {
            response = await axios(url, { cancelToken: this.source.token, validateStatus: function (status) {
                return status < 500; // Reject only if the status code is greater than or equal to 500
            }});
            if (response.status!==400) return response;
            retries++;
        }
        return response;

    },

    isObject(item) {
        return (item && typeof item === 'object' && !Array.isArray(item));
    },
    mergeDeep(target, source) {
        let output = Object.assign({}, target);
        if (this.isObject(target) && this.isObject(source)) {
            Object.keys(source).forEach(key => {
                if (this.isObject(source[key])) {
                    if (!(key in target))
                        Object.assign(output, { [key]: source[key] });
                    else
                        output[key] = this.mergeDeep(target[key], source[key]);
                } else {
                    Object.assign(output, { [key]: source[key] });
                }
            });
        }
        return output;
    },

    refactorList(list,board_name,board_url){
        if(list.name.toLowerCase().includes('sprint')){

            return {id:list.id,lname:list.name,bname:board_name,url:board_url};
        }
        return false;

    },

    graphRefactor(data){
        let now = moment().format("MMMM-YY");
        return Object.keys(data).map((name) => {
            let months = data[name];
            let sprints = [];
            for (let month in months) {
                let sprintData = months[month];
                for (let sprintName in sprintData) {
                    let sprint = sprintData[sprintName];
                    let diff = moment(month, "MMMM-YY").diff(moment(now, "MMMM-YY"), "months");
                    sprints.push({
                        due: sprint.due,
                        url: sprint.url,
                        sprint: sprintName,
                        project: sprint.bname,
                        monthsFromNow: diff
                    });
                }

            }
            return {name: name, sprints: sprints};
        });
    },

    async authorize(dispatch){
        let token = localStorage.getItem("tToken");
        if(token!==undefined&&token!==null){
            API_TOKEN = token;
            let user= await this.tokenIsValid();
            if(user){
                return dispatch({
                    type:AUTHORIZE,
                    payload:user.username,
                });
            }
        }
        let origin = window.location.origin;
        let url= `https://trello.com/1/authorize?callback_method=postMessage&return_url=${origin}&response_type=token&scope=read&expiration=1hour&name=Dallo&key=${API_KEY}`;
        let popup = window.open(url,"trello","width=500","height=500");
        let receiveMessage = async (event) => {
            if (event.origin !== 'https://trello.com' || event.source !== popup)return;
            event.source.close();
            if(event.data==='') return;
            API_TOKEN = event.data;
            localStorage.setItem('tToken', API_TOKEN);
            window.removeEventListener("message",receiveMessage,false);
            let user= await this.tokenIsValid();
            if(!user) return;
            return dispatch({
                type:AUTHORIZE,
                payload:user.username,
            });
        };
        dispatch({
            type:WAITING_AUTHORIZATION,
        });
        window.addEventListener("message",receiveMessage,false);
    },


    async fetchBoardsAndMembers(dispatch){
        let response = await trello.get('members/me/organizations/', 'fields=idBoards');
        if(noValidated(response,dispatch))return false;
        let teams = response.data;
        let idBoards = [];
        let allMembers = {};
        for (let team of teams) {
            for (let id of team.idBoards) {

                response = await trello.get(`boards/${id}/members`);
                if(noValidated(response,dispatch))return false;
                let board_members=response.data;

                for (let member of board_members) {
                    allMembers[[member.id]] = member.fullName;
                }
                idBoards.push(id);
            }
        }
        return [idBoards, allMembers];
    },

    async fetchSprints(idBoards,dispatch){

        let final_lists = [];
        let response;
        for (let id of idBoards) {

            response = await trello.get(`boards/${id}`, 'fields=name,url&lists=open');
            if(noValidated(response,dispatch))return false;
            let board = response.data;

            for (let list of board.lists) {
                let refactedList = trello.refactorList(list, board.name, board.url);
                if (refactedList) {
                    final_lists.push(refactedList);
                }
            }
        }
        return final_lists;
    },

    async fetchSprintsPerMember(sprints,allMembers,dispatch){
        let response;
        let result = {};
        let aux = {};
        let maxTime = moment();
        const iterPerStep = Math.round(sprints.length / 4);
        let iter = 0;
        for (let list of sprints) {
            if (iter > iterPerStep) {
                console.log('pepe');
                step.next(dispatch);
                iter = 0;
            }
            iter += 1;

            response = await trello.get(`lists/${list.id}/cards`, 'fields=idMembers,due,dueComplete');
            if(noValidated(response,dispatch))return false;
            let cards = response.data;

            let maxDue = 0;
            let members = [];

            for (let card of cards) {
                let due = card.due;
                if (card.due !== undefined) {
                    if (moment(due) > moment(maxDue)) {
                        maxDue = due;
                    }

                }
                for (let memberId of card.idMembers) {
                    if (memberId !== undefined) {
                        members.push(memberId);
                    }
                }
            }

            for (let memberId of members) {
                let month = moment(maxDue).format("MMMM-YY");
                if (moment() <= moment(maxDue)) {
                    if (moment(maxTime) < moment(maxDue)) {
                        maxTime = maxDue;
                    }
                    let memberObject = {
                        [allMembers[memberId]]: {
                            [month]: {
                                [list.lname]: {
                                    bname: list.bname,
                                    //lname: list.lname,
                                    url: list.url,
                                    due: maxDue
                                }
                            }
                        }
                    };
                    aux = trello.mergeDeep(result, memberObject);
                    result = aux;

                }
            }

        }
        return [result, maxTime];
    },
    async tokenIsValid(){
        let response = await trello.get(`members/me`, 'fields=username');
        if(response.status===200)return response.data;
        return false;
    },

};

export const step = {
    value: 0,
    next(dispatch){
        this.value +=1;
        dispatch({
            type:FETCH_DASHBOARD_STEP,
            payload:this.value,
        });
    }

};

export function noValidated(response,dispatch) {
    switch(response.status){
        case 200:
            return false;
        case 400:
            dispatch({
                type:FETCH_DASHBOARD_ERROR,
                payload:'No se pudo comunicar con Trello',
            });
            return true;
        case 401:
            dispatch({
                type:FETCH_DASHBOARD_ERROR,
                payload:'Error de authenticación',
            });
            return true;
        default:
            dispatch({
                type:FETCH_DASHBOARD_ERROR,
                payload:'Error: '+response.status,
            });
            return true;
    }

}

