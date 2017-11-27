
import {AUTHORIZE, WAITING_AUTHORIZATION} from "./index";
const EXPIRATION = "30days";
export const getToken= () => async (dispatch, getState, {trello,step}) => {
    let token = localStorage.getItem("tToken");
    if(token!==undefined&&token!==null){
        trello.API_TOKEN = token;
        let user= await trello.tokenIsValid();
        if(user){
            return dispatch({
                type:AUTHORIZE,
                payload:user.username,
            });
        }
    }
    let origin = window.location.origin;
    let url= `https://trello.com/1/authorize?callback_method=postMessage&return_url=${origin}&response_type=token&scope=read&expiration=${EXPIRATION}&name=Dallo&key=${trello.API_KEY}`;
    let popup = window.open(url,"trello","width=500","height=500");
    let receiveMessage = async (event) => {
        if (event.origin !== 'https://trello.com' || event.source !== popup)return;
        event.source.close();
        if(event.data==='') return;
        trello.API_TOKEN = event.data;
        localStorage.setItem('tToken', trello.API_TOKEN);
        window.removeEventListener("message",receiveMessage,false);
        let user= await trello.tokenIsValid();
        if(!user) return;
        return dispatch({
            type:AUTHORIZE,
            payload:user.username,
        });
    };
    window.addEventListener("message",receiveMessage,false);
    return dispatch({
        type:WAITING_AUTHORIZATION,
    });
};