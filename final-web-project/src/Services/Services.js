import React from "react";
import axios from "axios";

const BASE_URL = 'https://posts-pw2021.herokuapp.com/api/v1';
let data = {};

export const signIn = async (username, password) => {
    const response = await axios.post(`${BASE_URL}/auth/signin`, { username, password});
    return response;
};

export const Auth = async (token) => {
    let config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    };
    
    const authResponse = await axios.get(`${BASE_URL}/auth/whoami`,config);
    return authResponse.data;
};

export const logout =  () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
};