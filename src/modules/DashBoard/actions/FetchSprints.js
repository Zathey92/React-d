import {fetchSprintsPerMember} from "./FetchSprintsPerMember";
import {isNotValid} from "../../../utils/api";

export const  fetchSprints = (idBoards, allMembers) => async (dispatch, getState, {trello,step}) => {
    step.next(dispatch);
    let final_lists = [];
    let response;
    let type;
    for (let id of idBoards) {
        response = await trello.get(`boards/${id}`, 'fields=name,url&lists=open');
        type = isNotValid(response);
        if(type) return dispatch(type);
        let board = response.data;

        for (let list of board.lists) {
            let refactedList = trello.refactorList(list, board.name, board.url);
            if (refactedList) {
                final_lists.push(refactedList);
            }
        }
    }
    return dispatch(fetchSprintsPerMember(final_lists,allMembers));
};