import axios from 'axios';
import { useCookies } from 'react-cookie';

const baseURL = process.env.REACT_APP_BASE_URL as string;

export const GetUsers = async (accessToken: string) => {
    const query = `#graphql
        query Users {
            users {
                fullname
                username
                role
                refreshToken
            }
        }
    `;
    const response = await axios.post(
        baseURL,
        {
            query,
        },
        {
            headers: {
                Authorization: accessToken,
            },
        },
    );
    const users = response?.data?.data?.users;
    if (!users) {
        console.error(response?.data?.errors[0]?.message)
    }

    return users;
};

export const GetUserProfile = async (accessToken: string, username: string) => {
    const query = `#graphql
        query User($username: String!) {
            user(username: $username) {
                fullname
                username
                role
                refreshToken
            }
        }
    `;
    const response = await axios.post(
        baseURL,
        {
            query,
            variables: {
                username,
            },
        },
        {
            headers: {
                Authorization: accessToken,
            },
        },
    );

    return response?.data?.data?.user;
};
