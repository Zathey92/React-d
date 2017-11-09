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
            let all_members = {};
            let response = await api.get_boards_id();
            let idBoards = [];
            for(let team of response){
                for(let id of team.idBoards){
                    let board_members= await api.get_members(id);
                    for(let member of board_members){

                        all_members[[member.id]] = member.fullName;

                    }
                    idBoards.push(id);
                }
            }


            step.next(dispatch);
            let final_lists=[]
            for (let id of idBoards){
                response = await api.get_board_names_and_lists(id);
                let board_name = response.name;
                let board_url = response.url;
                for (let list of response.lists){
                    let refracted_list=api.refractor_list(list,board_name,board_url)
                    if(refracted_list){
                        final_lists.push(refracted_list);
                    }
                }
            };
            step.next(dispatch);
            let result = {};
            const iterPerStep = Math.round(final_lists.length/4);
            let iter = 0;
            for (let list of final_lists) {
                if(iter>iterPerStep){
                    step.next(dispatch);
                    iter=0;
                }
                iter+=1;
                let response = await api.get_list_info(list.id);
                let max_due = 0;
                let members = [];
                for(let card of response){
                    let due =card.due;
                    if(card.due!==undefined){
                        if(moment(due)>moment(max_due)){
                            max_due=due;
                        }

                    }
                    for(let member_id of card.idMembers){
                        if(member_id !== undefined){
                            members.push(member_id);
                        }
                    }
                }

                for(let member_id of members){
                    let month = moment(max_due).format("MMMM-YY");
                    if(moment()<=moment(max_due)){
                        let memberObject = {
                            [all_members[member_id]]: {
                                [month]: {
                                    [list.id]: {
                                        bname: list.bname,
                                        lname: list.lname,
                                        url: list.url,
                                        due: max_due
                                    }
                                }
                            }
                        };
                        let aux = api.mergeDeep(result,memberObject);
                        result=aux;
                    }
                }

            }

            dispatch({
                type:FETCH_DASHBOARD_END,
                payload:result,
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

