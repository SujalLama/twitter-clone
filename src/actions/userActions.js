import axios from "axios"
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT } from "../constants/userConstants"

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
        console.log(email);

        const {data} = await axios.post('/api/v1/auth/login', {email, password}, config)
        console.log(data);
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