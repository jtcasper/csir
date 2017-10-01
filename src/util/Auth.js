import axios from 'axios';
import _ from 'lodash';
import store from '../store';
import { setToken } from '../actions';
import { URL, LOGIN } from '../config/Api';

export function InvalidCredentialsException(message) {
    this.message = message;
    this.name = 'InvalidCredentialsException';
}

export function login (username, password) {
    console.log(URL + LOGIN)
    return axios
    .post(URL + LOGIN, {
        username,
        password
    })
    .then(function (response) {
        store.dispatch(setToken(response.data.token));
    })
    .catch(function (error) {
        //raise differenct exception if due to invalid creds
        if (_.get(error, 'response_status') === 400) {
            throw new InvalidCredentialsException(error)
        }
        throw error;
    });
}

export function loggedin() {
    return store.getState().token == null;
}