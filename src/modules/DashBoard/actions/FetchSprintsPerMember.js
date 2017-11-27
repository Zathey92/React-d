import moment from "moment";
import {isNotValid} from "../../../utils/api";
import {FETCH_DASHBOARD_END} from "./index";

export const  fetchSprintsPerMember = (sprints, allMembers) => async (dispatch, getState, {trello,step}) => {
    let response;
    let result = {};
    let aux = {};
    let type;
    let maxTime = moment();
    const iterPerStep = Math.round(sprints.length / 4);
    let iter = 0;
    for (let list of sprints) {
        if (iter > iterPerStep) {
            step.next(dispatch);
            iter = 0;
        }
        iter += 1;

        response = await trello.get(`lists/${list.id}/cards`, 'fields=idMembers,due,dueComplete');
        type = isNotValid(response);
        if(type) return dispatch(type);
        let cards = response.data;

        let maxDue = 0;
        let members = [];

        for (let card of cards) {
            let due = card.due;
            if (card.due !== undefined) {
                if (moment(due) > moment(maxDue)) {
                    maxDue = due;
                }

            }
            for (let memberId of card.idMembers) {
                if (memberId !== undefined) {
                    members.push(memberId);
                }
            }
        }

        for (let memberId of members) {
            let month = moment(maxDue).format("MMMM-YY");
            if (moment() <= moment(maxDue)) {
                if (moment(maxTime) < moment(maxDue)) {
                    maxTime = maxDue;
                }
                let memberObject = {
                    [allMembers[memberId]]: {
                        [month]: {
                            [list.lname]: {
                                bname: list.bname,
                                //lname: list.lname,
                                url: list.url,
                                due: maxDue
                            }
                        }
                    }
                };
                aux = trello.mergeDeep(result, memberObject);
                result = aux;

            }
        }

    }
    result =  trello.graphRefactor(result);
    return dispatch({
        type:FETCH_DASHBOARD_END,
        payload:result,
        maxMonth:moment(maxTime).format("MMMM-YY"),
    });
};