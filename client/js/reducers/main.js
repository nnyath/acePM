import consts from '../util/consts'

/* TODO: Move default state into conts file so we can reuse default state in testing */
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