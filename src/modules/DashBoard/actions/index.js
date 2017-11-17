import moment from 'moment'
export const FETCH_DASHBOARD_START = 'FETCH_DASHBOARD_START';
export const FETCH_DASHBOARD_STEP = 'FETCH_DASHBOARD_STEP';
export const FETCH_DASHBOARD_END = 'FETCH_DASHBOARD_END';
export const FETCH_DASHBOARD_ERROR = 'FETCH_DASHBOARD_ERROR';

export function fetchDashBoard(){

    return async (dispatch,getState,api)=>{
        step.value=0;
        dispatch({ type:FETCH_DASHBOARD_START });

        try{
            let response = await api.refractorBoard(await api.get_boards_id());
            let all_members = response[1];
            let idBoards= response[0];
            step.next(dispatch);

            let final_lists=[];
            for (let id of idBoards){
                response = await api.get_board_names_and_lists(id);
                let board_name = response.name;
                let board_url = response.url;
                for (let list of response.lists){
                    let refracted_list=api.refractor_list(list,board_name,board_url);
                    if(refracted_list){
                        final_lists.push(refracted_list);
                    }
                }
            }
            step.next(dispatch);
            let result = {};
            let aux = {};
            let maxTime = moment();
            const iterPerStep = Math.round(final_lists.length/4);
            let iter = 0;
            for (let list of final_lists) {
                if(iter>iterPerStep){
                    step.next(dispatch);
                    iter=0;
                }
                iter+=1;
                let response = await api.get_list_info(list.id);
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
                                [all_members[memberId]]: {
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
                            aux = api.mergeDeep(result, memberObject);
                            result = aux;

                    }
                }

            }

            let now = moment().format("MMMM-YY");
            result = Object.keys(result).map((name) => {
                let months = result[name];
                let sprints=[];
                for(let month in months) {
                    let sprintData=months[month]
                    for(let sprintName in sprintData){
                        let sprint = sprintData[sprintName];
                        let diff = moment(month,"MMMM-YY").diff(moment(now,"MMMM-YY"),"months");
                        console.log(sprint.url);
                        sprints.push({due:sprint.due,url:sprint.url,sprint:sprintName,project:sprint.bname, monthsFromNow:diff});
                    }

                }
                let aux = {name:name,sprints:sprints};

                return aux;
            });

            dispatch({
                type:FETCH_DASHBOARD_END,
                payload:result,
                maxMonth:moment(maxTime).format("MMMM-YY"),
            });

        }catch(e){

            dispatch({
                type:FETCH_DASHBOARD_ERROR,
                payload:e.status,
            });
        }






    };

}

const step = {
    value: 0,
    next(dispatch){
        this.value +=1;
        dispatch({
            type:FETCH_DASHBOARD_STEP,
            payload:this.value,
        });
    }

};

