import React from 'react'
import './logout.css'
import {logout} from '../../actions/userActions';
import {useDispatch} from 'react-redux';

const Logout = () => {
    const dispatch = useDispatch();
    
    const signout = () => {
        dispatch(logout());
    }

    return (
        <div className="logout-container" onClick ={() => signout()}>
            <h4>Log out @alpa110</h4>
        </div>
    )
}

export default Logout
