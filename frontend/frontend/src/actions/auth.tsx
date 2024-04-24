import axios from 'axios';
import auth_request from "../utils/auth";
import profile_request from '../utils/profile';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://127.0.0.1:8000/';

export const register = async (email: string, password: string, re_password: string) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({ email, password, re_password });

    return axios.post(auth_request.fetchRegister, body, config);
}

export const login = async (email: string, password: string) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({ email, password });

    return axios.post(auth_request.fetchLogin, body, config);
}


export const checkAuthenticated = () => {
    return new Promise(async (resolve, reject) => {
        const token = localStorage.getItem('token');
        if (token) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            };
            const body = JSON.stringify({ token: token });
            await axios.post(auth_request.fetchVerify, body, config)
                .then((res) => {
                    if (res.status === 200) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                })
                .catch(error => {
                    console.error("Error while verifying token:", error);
                    resolve(false);
                });
        } else {
            resolve(false);
        }
    });
}


export const getUser = async () => {
    const token = localStorage.getItem('token');

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/json'
        }
    }
    return axios.get(profile_request.fetchProfile, config)
};


export function updateUser(data: any) {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/json'
        }
    }

    axios.put(profile_request.fetchUpdateProfile, data, config)
}
