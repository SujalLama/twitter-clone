import axios from 'axios';
import {
    POST_LIST_REQUEST,
    POST_LIST_SUCCESS,
    POST_LIST_FAIL,
    CREATE_POST_REQUEST,
    CREATE_POST_SUCCESS,
    CREATE_POST_FAIL,
    DELETE_POST_FAIL,
    DELETE_POST_SUCCESS,
    DELETE_POST_REQUEST
} from '../constants/postConstants';

export const listPosts = () => async (dispatch) => {
    try {
        dispatch({type: POST_LIST_REQUEST})

        const {data} = await axios.get('/api/v1/posts')

        dispatch({
            type: POST_LIST_SUCCESS,
            payload: data.data
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

export const createPost = (text, tweetPhoto) => async (dispatch) => {
    try {
        dispatch({type: CREATE_POST_REQUEST})
         let {token} = JSON.parse(localStorage.getItem("userInfo"));
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }

        const {data} = await axios.post('/api/v1/posts', {text}, config);

                    const config2 = {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    }
                }

        if (data.data._id) {
            await axios.put(`/api/v1/posts/${data.data._id}/photo`, tweetPhoto, config2);
        }
           
        dispatch({
            type: CREATE_POST_SUCCESS,
            })
        
        dispatch(listPosts());
    } catch (err) {
        dispatch({
            type: CREATE_POST_FAIL,
            payload: err.response && err.response.data.message
                ? err.response.data.message
                : err.message
        })
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        dispatch({type: DELETE_POST_REQUEST})
         let {token} = JSON.parse(localStorage.getItem("userInfo"));
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        await axios.delete(`/api/v1/posts/${id}`, config)
        dispatch({
            type: DELETE_POST_SUCCESS,
            })
        
    } catch (err) {
        dispatch({
            type: DELETE_POST_FAIL,
            payload: err.response && err.response.data.message
                ? err.response.data.message
                : err.message
        })
    }
}