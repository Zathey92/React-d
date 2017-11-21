import {
    AUTHORIZE, FETCH_DASHBOARD_END, FETCH_DASHBOARD_ERROR, FETCH_DASHBOARD_START,
    FETCH_DASHBOARD_STEP
} from "./actions/index";
import moment from "moment";

const initialState = {
    isLoaded: false,
    isLoading: false,
    isAuthorized:false,
    step:0,
    data: [],
    maxMonth:moment().format("MMMM-YY"),
    error:false,
};

export default function(state = initialState, action) {

    switch (action.type) {
        case FETCH_DASHBOARD_START:
            return Object.assign({}, state, {
                isLoading: true,
                isLoaded: false,
                error:false,
                step:0,
            });
        case FETCH_DASHBOARD_STEP:

            return Object.assign({}, state, {
                step:action.payload,
            });
        case FETCH_DASHBOARD_END:

            return Object.assign({}, state, {
                isLoading: false,
                isLoaded:true,
                step:-1,
                maxMonth: action.maxMonth,
                data:action.payload,
            });
        case FETCH_DASHBOARD_ERROR:

            return Object.assign({}, state, {
                isLoading: false,
                isLoaded:false,
                error:action.payload,
            });
        case AUTHORIZE:
            return Object.assign({}, state, {
                isAuthorized:true,
            });
        default:
            return state;
    }
}