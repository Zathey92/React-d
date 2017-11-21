import moment from "moment";
import {FETCH_DASHBOARD_STEP} from "../modules/DashBoard/actions/index";

const API_KEY = 'c7300c59c78515316cd1119c65207467';
const API_KEY2 = '3c4fe1a2ccaca8c8ac6270a0bdf36733';
const API_TOKEN2='6b7a5c38f46c6fbd29a0a69004cac54f019e16e1de8e3c6397004c06a0bb0874';
//const API_TOKEN='6167f8979079d3005819aadb3bf3180f5804315f1d505bd6e4b5b7260fbdc7e2';
var API_TOKEN;
const url=`members/me/organizations/?fields=idBoards&key=${API_KEY}&token=${API_TOKEN}`;


export const trello = {

    getTeamBoards(){
        //var promise = new Promise((resolve, reject) =>{
        return window.Trello.get(url,(value) => {return value},(error) => {return error});
        //});
        //return promise;
    },
    getBoardLists(board_id){
        const url2=`boards/${board_id}?fields=name,url&lists=open&key=${API_KEY}&token=${API_TOKEN}`;
        return window.Trello.get(url2,(value) => {return value},(error) => {return error});

    },
    getListInfo(list_id){
        const url2= `lists/${list_id}/cards?fields=idMembers,due,dueComplete&key=${API_KEY}&token=${API_TOKEN}`;
        return window.Trello.get(url2,(value) => {return value},(error) => {return error});
    },

    getMembers(board_id){
        const url2 = `boards/${board_id}/members?key=${API_KEY}&token=${API_TOKEN}`;
        return window.Trello.get(url2,(value) => {return value},(error) => {return error});
    },

    getToken(){
        var authenticationSuccess = function() {
            console.log('Successful authentication');
        };

        var authenticationFailure = function() {
            console.log('Failed authentication');
        };
        window.Trello.setKey(API_KEY);
        return window.Trello.authorize({
            type: 'popup',
            name: 'Dallo',
            scope: {
                read: 'true',
                write: 'false'
            },
            expiration: '1hour',
            success: authenticationSuccess,
            error: authenticationFailure,
        });
    },

    async authorize(){
        try {
            this.API_TOKEN = await this.getToken();
            console.log('pepe');
        }catch(e){
            console.log('error');
        }

    },
    /** @namespace team.idBoards **/
    /** @namespace member.fullName **/
    async getBoardsAndMembers(teams){
        let idBoards=[];
        let allMembers = {};
        for(let team of teams){
            for(let id of team.idBoards){
                let board_members;
                try {
                    board_members = await this.getMembers(id);
                }catch(e){
                    throw e;
                }
                for(let member of board_members){
                    allMembers[[member.id]] = member.fullName;
                }
                idBoards.push(id);
            }
        }
        return [idBoards, allMembers];
    },
    /** @namespace response.lists **/
    async getSprints(idBoards) {
        let final_lists=[];
        let response;
        for (let id of idBoards) {
            try {
                response = await this.getBoardLists(id);
            } catch (e) {
                throw e;
            }
            let board_name = response.name;
            let board_url = response.url;
            for (let list of response.lists) {
                let refactedList = this.refactorList(list, board_name, board_url);
                if (refactedList) {
                    final_lists.push(refactedList);
                }
            }
        }
        return final_lists;
    },
    /** @namespace card.idMembers **/
    async getSprintsPerMember(sprints,allMembers, dispatch){
        let response;
        let result = {};
        let aux = {};
        let maxTime = moment();
        const iterPerStep = Math.round(sprints.length/4);
        let iter = 0;
        for (let list of sprints) {
            if(iter>iterPerStep){
                step.next(dispatch);
                iter=0;
            }
            iter+=1;
            try{
                response = await this.getListInfo(list.id);
            }catch(e){
                throw e;
            }
            let maxDue = 0;
            let members = [];

            for(let card of response){
                let due =card.due;
                if(card.due!==undefined){
                    if(moment(due)>moment(maxDue)){
                        maxDue=due;
                    }

                }
                for(let memberId of card.idMembers){
                    if(memberId !== undefined){
                        members.push(memberId);
                    }
                }
            }

            for(let memberId of members){
                let month = moment(maxDue).format("MMMM-YY");
                if(moment()<=moment(maxDue)){
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
                    aux = this.mergeDeep(result, memberObject);
                    result = aux;

                }
            }

        }
        return [result,maxTime];
    },

    refactorList(list,board_name,board_url){
            if(list.name.toLowerCase().includes('sprint')){

                return {id:list.id,lname:list.name,bname:board_name,url:board_url};
            }
            return false;

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

    graphRefactor: function (data) {
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
    }

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

