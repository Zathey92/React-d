
export const FETCH_DASHBOARD_START = 'FETCH_DASHBOARD_START';
export const FETCH_DASHBOARD_STEP = 'FETCH_DASHBOARD_STEP';
export const FETCH_DASHBOARD_END = 'FETCH_DASHBOARD_END';
export const FETCH_DASHBOARD_ERROR = 'FETCH_DASHBOARD_ERROR';

export function fetchDashBoard(){

    return async (dispatch,getState,api)=>{

        dispatch({ type:FETCH_DASHBOARD_START });
        try{

            let response = await api.get_boards_id();
            let idBoards = [];
            response.forEach((team)=>{
                team.idBoards.forEach((id)=>{
                    idBoards.push(id);
                });
            });
            //let response = await api.get_lists();
            dispatch({
                type:FETCH_DASHBOARD_STEP,
                payload:0
            });
            dispatch({
                type:FETCH_DASHBOARD_STEP,
                payload:1
            });
            dispatch({
                type:FETCH_DASHBOARD_STEP,
                payload:2
            });
            dispatch({
                type:FETCH_DASHBOARD_END,
                payload:idBoards
            });

        }catch(e){

            dispatch({
                type:FETCH_DASHBOARD_ERROR,
                payload:e.status,
            });
        }






    };

}

