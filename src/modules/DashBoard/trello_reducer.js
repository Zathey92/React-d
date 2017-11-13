import {FETCH_DASHBOARD_END, FETCH_DASHBOARD_ERROR, FETCH_DASHBOARD_START, FETCH_DASHBOARD_STEP} from "./actions/index";
import moment from "moment";

const initialState = {
    isLoaded: false,
    isLoading: false,
    step:0,
    data: [],
    maxMonth:moment().format("MMMM-YY"),
};

export default function(state = initialState, action) {

    switch (action.type) {
        case FETCH_DASHBOARD_START:
            return Object.assign({}, state, {
                isLoading: true,
                isLoaded: false,
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
            });
        default:
            return state;
    }
}