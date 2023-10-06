
import { UserLogin, UserSignup } from 'src/types/interfaces';
import axios from 'axios';

axios.defaults.withCredentials = true;
const baseURL = process.env.REACT_APP_BASE_URL as string

export const Login = async (user: UserLogin) => {
    const query = `#graphql
        mutation Login($username: String!, $password: String!) {
            login(username: $username, password: $password) {
                fullname
                username
                role
                accessToken
            }
        }
    `
    const response = await axios.post(baseURL, {
        query,
        variables: user
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return response?.data?.data?.login;
}

export const Signup = async (user: UserSignup) => {
    const query = `#graphql
        mutation Register($fullname: String!, $username: String!, $password: String!) {
            register(fullname: $fullname, username: $username, password: $password) {
                fullname
                username
            }
        }
    `
    const response = await axios.post(baseURL, {
        query,
        variables: user
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return response?.data?.data?.register;
}

export const Logout = async (accessToken: string) => {
    const query = `#graphql
        mutation Logout {
            logout {
                logout
            }
        }
    `
    let response
    try {
        response = await axios.post(baseURL, {
            query
        }, {
            headers: {
                Authorization: accessToken
            }
        })
    } catch (err) {
        console.error(err)
    }

    return response?.data?.data?.logout;
}
