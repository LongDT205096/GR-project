import axios from 'axios';
import request from "../utils/auth";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://127.0.0.1:8000/';

export const register = async (email: string, password: string, re_password: string) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({ email, password, re_password });

    return axios.post(request.fetchRegister, body, config);
}

export const login = async (email: string, password: string) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({ email, password });

    return axios.post(request.fetchLogin, body, config);
}

export const checkAuthenticated = () => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
        const body = JSON.stringify({ token: localStorage.getItem('token') });
        console.log(body);
        axios.post(request.fetchVerify, body, config)
            .then((res) => {
                if (res.status === 200) {
                    return true;
                }
                return false
            });
        }
    return false;   
}
