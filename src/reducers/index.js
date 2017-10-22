import { combineReducers } from 'redux';
import * as actionType from '../actions/types';

const tokenInitialState = null;
const token = (state = tokenInitialState, action) => {
    switch(action.type) {
        case actionType.SET_TOKEN:
            return action.data;
        default:
            return state;
    }
}

const issueInitialState = null;
const issues = (state = issueInitialState, action) => {
    switch(action.type) {
        case actionType.GET_ISSUE:
            return action.data;
        default:
            return state;
    }
}

const appReducer = combineReducers({
    token,
})

const rootReducer = (state, action) => {
    return appReducer(state, action);
}

export default rootReducer;