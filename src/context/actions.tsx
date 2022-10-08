import React from "react";
import { actionType } from "./reducer";

const ROOT_URL = 'https://restful-booker.herokuapp.com/auth';

export async function loginUser(dispatch: React.Dispatch<any>, loginPayload: actionType["payload"]) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({username: loginPayload.user, password: loginPayload.auth_token }),
    };

    try {
        dispatch({ type: 'REQUEST_LOGIN '});
        let response = await fetch(`${ROOT_URL}/login`, requestOptions);
        let data = await response.json();

        if(data.user) {
            dispatch({type: 'LOGIN_SUCCESS', payload: data });
            localStorage.setItem('currentUser', JSON.stringify(data));
            return data
        }

        dispatch({type: 'LOGIN_ERROR', error: data.errors[0] });
        return;
    } catch (error) {
        dispatch({ type: 'LOGIN_ERROR', error: error});
    }
}

export async function logout(dispatch: React.Dispatch<any>){
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
}