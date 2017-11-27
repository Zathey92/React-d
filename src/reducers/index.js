import { combineReducers } from 'redux';
import TrelloReducer from "../modules/DashBoard/reducers/trello_reducer"

const rootReducer = combineReducers({
    trello: TrelloReducer,
});

export default rootReducer;