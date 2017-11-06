const initialState = {
    isLoaded: false,
    isLoading: false,
    step:0,
    data: []
}

export default function(state = initialState, action) {

    switch (action.type) {
        case 'FETCH_DASHBOARD':
            return Object.assign({}, state, {
                isLoading: true,
            })
        case 'FETCH_DASHBOARD_SUCCEED':

            return Object.assign({}, state, {
                isLoading: false,
            })
        default:
            return state
    }
}