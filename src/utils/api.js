const API_KEY = 'c7300c59c78515316cd1119c65207467';
const API_TOKEN='6167f8979079d3005819aadb3bf3180f5804315f1d505bd6e4b5b7260fbdc7e2';
const url=`members/me/organizations/?fields=idBoards&key=${API_KEY}&token=${API_TOKEN}`;

export default{

    get_boards_id(){
        var promise = new Promise((resolve, reject) =>{
            return window.Trello.get(url,(value) => resolve(value),(error) => reject(error));
        });
        return promise;
    },
}
