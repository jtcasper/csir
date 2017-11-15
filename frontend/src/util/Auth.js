import axios from 'axios';
import _ from 'lodash';
import store from '../store';
import { setToken } from '../actions';
import { URL, LOGIN, REGISTER } from '../config/Api';

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

export function register(first_name, last_name, email, username, password, official){
    console.log(URL + REGISTER);
    return axios
            .post(URL + REGISTER, {
                first_name,
                last_name,
                email,
                username,
                password,
                official
            })
            .then(function (response) {
                console.log(response);
                if(response.data.code === 200){
                    console.log("registration successfull");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
}
export function loggedin() {
    return store.getState().token != null;
}