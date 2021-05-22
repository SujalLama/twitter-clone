import axios from "axios"
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_PROFILE_EDIT_FAIL, USER_PROFILE_EDIT_REQUEST, USER_PROFILE_EDIT_SUCCESS, USER_PROFILE_FAIL, USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../constants/userConstants"

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })
        
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const {data} = await axios.post('/api/v1/auth/login', {email, password}, config)
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (err) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: err.response && err.response.data.message
                ? err.response.data.message
                : err.message
        })
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({type: USER_LOGOUT})
}

export const register = (firstname, lastname, username, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const {data} = await axios.post('/api/v1/auth/register', {firstname, lastname, username, email, password});
        
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (err) {
        console.log(err)
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: err.response && err.response.data.message
                ? err.response.data.message
                : err.message
        })
    }
}

export const userProfileAction = () => async (dispatch) => {
    try {
        dispatch({
            type: USER_PROFILE_REQUEST
        })
        let {token} = JSON.parse(localStorage.getItem("userInfo"));
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        const {data} = await axios.get('/api/v1/auth/me', config)
        dispatch({
            type: USER_PROFILE_SUCCESS,
            payload: data.data
        })
    } catch (err) {
        dispatch({
            type: USER_PROFILE_FAIL,
            payload: err.response && err.response.data.message
                ? err.response.data.message
                : err.message
        })
    }
}

export const userProfileEditAction = ((username, bio, address) => async (dispatch) => {
    try {
        dispatch({
            type: USER_PROFILE_EDIT_REQUEST
        })
        let {token} = JSON.parse(localStorage.getItem("userInfo"));
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }

        const {data} =  await axios.put('/api/v1/auth/updatedetails',  
                {
                username, 
                address,
                bio
                }, config);
        
        
        dispatch({
            type: USER_PROFILE_EDIT_SUCCESS,
            payload: data.data
        })

    } catch (err) {
        dispatch({
            type: USER_PROFILE_EDIT_FAIL,
            payload: err.response && err.response.data.message
                ? err.response.data.message
                : err.message
        })
    }
})