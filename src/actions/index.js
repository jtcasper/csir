import * as actionType from './types';

export const setToken = (data) => {
    return {
        type: actionType.SET_TOKEN,
        data
    }
}

export const getIssue = (data) => {
    return {
        type: actionType.GET_ISSUE,
        data
    }
}