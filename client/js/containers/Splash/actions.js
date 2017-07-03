import consts from '../../util/consts'
import {_wait} from '../../util/tests/testutil'

export const initLoad = () => ({
    type: consts.REDUX.INIT_LOADING,
    payload: new Promise((resolve,reject) => {
        _wait(3000).then(res => resolve(true))
    }).catch(err => reject(err))
})