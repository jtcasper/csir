import axios from 'axios';
import _ from 'lodash';
import store from '../store';
import {
    setToken, setUname
} from '../actions';
import {
    URL,
    LOGIN,
    REGISTER
} from '../config/Api';

export function InvalidCredentialsException(message) {
    this.message = message;
    this.name = 'InvalidCredentialsException';
}

export function logout() {
    store.dispatch(setToken(null));
    store.dispatch(setUname(null));
}

export function login(username, password) {
    console.log(URL + LOGIN)
    return axios
        .post(URL + LOGIN, {
            username,
            password
        })
        .then(function (response) {
            store.dispatch(setToken(response.data.token));
            if(response.status == 200){
                store.dispatch(setUname(username));
                console.log(store.getState().uname)
            }
        })
        .catch(function (error) {
            //raise differenct exception if due to invalid creds
            if (_.get(error, 'response_status') === 400) {
                throw new InvalidCredentialsException(error)
            }
            throw error;
        });
}

export function register(first_name, last_name, email, username, password, official) {
    console.log(URL + REGISTER);
    var res;
    axios
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
            if (response.data.code === 200) {
                console.log("registration successfull");
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

export function loggedin() {
    console.log(store.getState().token == null);
    if(store.getState().token == null){
        return false;
    }
    return true;
}