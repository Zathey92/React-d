import moment from "moment";
import * as axios from "axios";

//const API_KEY = 'c7300c59c78515316cd1119c65207467';


export const trello = {
    API_KEY: '3c4fe1a2ccaca8c8ac6270a0bdf36733',
    API_TOKEN: "",

    async get(uri,params){
        this.source=axios.CancelToken.source();
        let url;
        if(params===undefined){
            url=`https://api.trello.com/1/${uri}?key=${this.API_KEY}&token=${this.API_TOKEN}`;
        }else{
            url=`https://api.trello.com/1/${uri}?${params}&key=${this.API_KEY}&token=${this.API_TOKEN}`;
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

    async tokenIsValid(){
        let response = await trello.get(`members/me`, 'fields=username');
        if(response.status===200)return response.data;
        return false;
    },

};