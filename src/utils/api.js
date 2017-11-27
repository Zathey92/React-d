import {
    FETCH_DASHBOARD_ERROR, FETCH_DASHBOARD_STEP
} from "../modules/DashBoard/actions/index";

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
export function isNotValid(response) {
    switch(response.status){
        case 200:
            return false;
        case 400:
            return({
                type:FETCH_DASHBOARD_ERROR,
                payload:'No se pudo comunicar con Trello',
            });
        case 401:
            return({
                type:FETCH_DASHBOARD_ERROR,
                payload:'Error de authenticación',
            });
        default:
            return({
                type:FETCH_DASHBOARD_ERROR,
                payload:'Error: '+response.status,
            });
    }

}

