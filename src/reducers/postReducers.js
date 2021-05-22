import {
    POST_LIST_REQUEST,
    POST_LIST_SUCCESS,
    POST_LIST_FAIL,
    CREATE_POST_REQUEST,
    CREATE_POST_SUCCESS,
    CREATE_POST_FAIL
} from '../constants/postConstants';

export const postListReducer = (state= {posts: []}, action) => {
    switch (action.type) {
        case POST_LIST_REQUEST:
            return {loading: true, posts: []}
        case POST_LIST_SUCCESS:
            return {loading: false, posts: action.payload.data}
        case POST_LIST_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const createPostReducer = (state= {post: {}}, action) => {
    switch (action.type) {
        case CREATE_POST_REQUEST:
            return {loading: true}
        case CREATE_POST_SUCCESS:
            return {loading: false}
        case CREATE_POST_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}