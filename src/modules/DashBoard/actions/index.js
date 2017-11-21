import moment from 'moment'
export const FETCH_DASHBOARD_START = 'FETCH_DASHBOARD_START';
export const FETCH_DASHBOARD_STEP = 'FETCH_DASHBOARD_STEP';
export const FETCH_DASHBOARD_END = 'FETCH_DASHBOARD_END';
export const FETCH_DASHBOARD_ERROR = 'FETCH_DASHBOARD_ERROR';
export const AUTHORIZE = 'AUTHORIZE';


export const fetchDashboard = () => async (dispatch, getState,{trello,step}) => {

    dispatch({ type:FETCH_DASHBOARD_START });
    step.value=0;
    let response = await trello.fetchBoardsAndMembers(dispatch);
    if(!response)return;
    step.next(dispatch);
    let allMembers = response[1];
    let idBoards= response[0];
    response = await trello.fetchSprints(idBoards,dispatch);
    if(!response)return;
    step.next(dispatch);
    response = await trello.fetchSprintsPerMember(response,allMembers,dispatch);
    if(!response)return;
    step.next(dispatch);
    let maxTime = response[1];
    let result =  trello.graphRefactor(response[0]);
    return dispatch({
        type:FETCH_DASHBOARD_END,
        payload:result,
        maxMonth:moment(maxTime).format("MMMM-YY"),
    });
};

export const authorize= () => async (dispatch, getState,{trello,step}) => {
    trello.authorize(dispatch);
};


