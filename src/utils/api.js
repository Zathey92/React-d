const API_KEY = 'c7300c59c78515316cd1119c65207467';
const API_TOKEN='6167f8979079d3005819aadb3bf3180f5804315f1d505bd6e4b5b7260fbdc7e2';
const url=`members/me/organizations/?fields=idBoards&key=${API_KEY}&token=${API_TOKEN}`;


export default{

    get_boards_id(){
        //var promise = new Promise((resolve, reject) =>{
            return window.Trello.get(url,(value) => {return value},(error) => {return error});
        //});
        //return promise;
    },
    get_board_names_and_lists(board_id){
            const url2=`boards/${board_id}?fields=name,url&lists=open&key=${API_KEY}&token=${API_TOKEN}`
            return window.Trello.get(url2,(value) => {return value},(error) => {return error});

    },
    get_list_info(list_id){
        const url2= `lists/${list_id}/cards?fields=idMembers,due,dueComplete&key=${API_KEY}&token=${API_TOKEN}`
        return window.Trello.get(url2,(value) => {return value},(error) => {return error});
    },

    get_members(board_id){
        const url2 = `boards/${board_id}/members?key=${API_KEY}&token=${API_TOKEN}`
        return window.Trello.get(url2,(value) => {return value},(error) => {return error});
    },

    refractor_list(list,board_name,board_url){
            if(list.name.toLowerCase().includes('sprint')){

                return {id:list.id,lname:list.name,bname:board_name,url:board_url};
            }
            return false;

    },
    isObject(item) {
        return (item && typeof item === 'object' && !Array.isArray(item));
    },
    mergeDeep(target, source) {
        let output = Object.assign({}, target);
        if (this.isObject(target) && this.isObject(source)) {
            Object.keys(source).forEach(key => {
                if (this.isObject(source[key])) {
                    if (!(key in target))
                        Object.assign(output, { [key]: source[key] });
                    else
                        output[key] = this.mergeDeep(target[key], source[key]);
                } else {
                    Object.assign(output, { [key]: source[key] });
                }
            });
        }
        return output;
    },

}

