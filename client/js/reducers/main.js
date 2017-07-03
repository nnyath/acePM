import consts from '../util/consts'

export default reducer = ( state={
    init : false
}, action) => {

    switch(action.type){
        case consts.REDUX.INIT_LOADING_FULFILLED:{
            return {...state, init:action.payload}
        }
    }
    
    return state
}