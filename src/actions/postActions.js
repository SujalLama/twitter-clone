import axios from 'axios';
import {
    POST_LIST_REQUEST,
    POST_LIST_SUCCESS,
    POST_LIST_FAIL
} from '../constants/postConstants';

export const listPosts = () => async (dispatch) => {
    try {
        dispatch({type: POST_LIST_REQUEST})

        const {data} = await axios.get('/api/v1/posts')

        dispatch({
            type: POST_LIST_SUCCESS,
            payload: data
            })
    } catch (err) {
        dispatch({
            type: POST_LIST_FAIL,
            payload: err.response && err.response.data.message
                ? err.response.data.message
                : err.message
        })
    }
}