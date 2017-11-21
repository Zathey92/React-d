import moment from 'moment'
export const FETCH_DASHBOARD_START = 'FETCH_DASHBOARD_START';
export const FETCH_DASHBOARD_STEP = 'FETCH_DASHBOARD_STEP';
export const FETCH_DASHBOARD_END = 'FETCH_DASHBOARD_END';
export const FETCH_DASHBOARD_ERROR = 'FETCH_DASHBOARD_ERROR';

async function fetching(fetch,dispatch) {
    let data;
    let error=-1;
    try{
        return fetch();
    }catch(e){
        error=e;
    }
    switch(error){
        case 401:
            dispatch(FETCH_DASHBOARD_ERROR)
    }

}

export const fetchDashboard = () => async (dispatch, getState) => {

    try{
        let aux = await trello.getToken();
            console.log('pepa');
        }catch(e){
            dispatch({
                type:FETCH_DASHBOARD_ERROR,
                payload:e.status,
            });
            return
        }

        dispatch({ type:FETCH_DASHBOARD_START });
        step.value=0;
        let response;

        try{
            response = await trello.getBoardsAndMembers(await trello.getTeamBoards());
        }catch(e){
            dispatch({
                type:FETCH_DASHBOARD_ERROR,
                payload:e.status,
            });
            return;
        }

        let allMembers = response[1];
        let idBoards= response[0];
        step.next(dispatch);

        try{
            response = await trello.getSprints(idBoards);
        }catch(e){
            dispatch({
                type:FETCH_DASHBOARD_ERROR,
                payload:e.status,
            });
        }

        step.next(dispatch);

        try{
            response = await trello.getSprintsPerMember(response,allMembers,dispatch);
        }catch(e){

            dispatch({
                type:FETCH_DASHBOARD_ERROR,
                payload:e.status,
            });
            return;
        }

        let maxTime = response[1];
        let result =  trello.graphRefactor(response[0]);

        dispatch({
            type:FETCH_DASHBOARD_END,
            payload:result,
            maxMonth:moment(maxTime).format("MMMM-YY"),
        });

};


