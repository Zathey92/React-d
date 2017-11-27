
import {fetchSprints} from "./FetchSprints";
import {isNotValid} from "../../../utils/api";

export const  fetchBoardsAndMembers = () => async (dispatch, getState, {trello,step}) => {
    step.next(dispatch);
    let response = await trello.get('members/me/organizations/', 'fields=idBoards');
    let type = isNotValid(response);
    if(type) return dispatch(type);
    let teams = response.data;
    let idBoards = [];
    let allMembers = {};
    for (let team of teams) {
        for (let id of team.idBoards) {

            response = await trello.get(`boards/${id}/members`);
            type = isNotValid(response);
            if(type) return dispatch(type);
            let board_members=response.data;

            for (let member of board_members) {
                allMembers[[member.id]] = member.fullName;
            }
            idBoards.push(id);
        }
    }
    return dispatch(fetchSprints(idBoards, allMembers));
};