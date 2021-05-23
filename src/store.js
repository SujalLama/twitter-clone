import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {deletepostReducer, postListReducer} from './reducers/postReducers';
import {userLoginReducer, 
    userProfileReducer, 
    userRegisterReducer,
} from './reducers/userReducers';

const reducer = combineReducers({
    postList: postListReducer,
    postDelete: deletepostReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userProfile: userProfileReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

const initialState = {
    userLogin: {userInfo: userInfoFromStorage},
    userRegister: {userInfo: userInfoFromStorage},
}

const middleware = [thunk]

const store = createStore(
    reducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware))
    )

export default store;