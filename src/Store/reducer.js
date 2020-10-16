import * as actionTypes from './actions'

const initialState = {
    score: 0,
    missed: 0,
    name: ""
}

const reducer = (state = initialState, action)=> {
    switch(action.type){
        case actionTypes.ADD_SCORE:
            return {
                ...state,
                score: state.score+1
            }
        case actionTypes.ADD_NAME:
            return {
                ...state,
                name: action.name
            }
        case actionTypes.MISSED_MOLE:
            return {
                ...state,
                missed: state.missed + 1
            }
        case actionTypes.ZERO:
            return {
                ...state,
                score: 0,
                missed: 0
            }
        default:
            return state
    }


}

export default reducer