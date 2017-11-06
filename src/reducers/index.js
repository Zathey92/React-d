import { combineReducers } from 'redux';
import TrelloReducer from "../modules/DashBoard/trello_reducer"

const rootReducer = combineReducers({
    trello: TrelloReducer,
})

export default rootReducer;