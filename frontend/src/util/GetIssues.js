import axios from 'axios';
import store from '../store';
import { getIssue } from '../actions';
import { URL, ISSUE } from '../config/Api';

export function getIssues () {
    return axios
    .get(URL + ISSUE, {
        params: {
            lat:35.779,
            lng:-78.6382
        }
    })
    .then(function (response) {
        store.dispatch(getIssue(response.data));
        // return response.data.issues
    })
    .catch(function(error) {
        console.log(error)
    })
}