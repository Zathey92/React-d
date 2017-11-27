import {fetchBoardsAndMembers} from "./FetchBoardsAndMembers";
import {getToken} from "./Authorize";
export const FETCH_DASHBOARD_START = 'FETCH_DASHBOARD_START';
export const FETCH_DASHBOARD_STEP = 'FETCH_DASHBOARD_STEP';
export const FETCH_DASHBOARD_END = 'FETCH_DASHBOARD_END';
export const FETCH_DASHBOARD_ERROR = 'FETCH_DASHBOARD_ERROR';
export const AUTHORIZE = 'AUTHORIZE';
export const LOGOUT = 'LOGOUT';
export const WAITING_AUTHORIZATION = 'WAITING_AUTHORIZATION';



export const fetchDashboard = () => async (dispatch, getState,{trello,step}) => {
    step.value=0;
    dispatch({ type:FETCH_DASHBOARD_START });
    return dispatch(fetchBoardsAndMembers());
};

export const authorize= () => async (dispatch, getState,{trello,step}) => {
    return dispatch(getToken());
};

export const logout=()=> async (dispatch, getState,{trello,step}) => {
    trello.source.cancel('Operation canceled by the user.');
    localStorage.removeItem('tToken');
    return dispatch({ type: LOGOUT });
};


