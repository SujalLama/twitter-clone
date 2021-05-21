import React, {useState, useEffect, useRef} from 'react'
import './logout.css'
import {logout} from '../../actions/userActions';
import {useDispatch} from 'react-redux';
import { useHistory } from 'react-router';

const Logout = () => {
    const dispatch = useDispatch();
    const[active, setActive] = useState()
    const history = useHistory();
    const signout = () => {
        dispatch(logout());
        history.push('/')
    }

    return (
        <div className="logout-container" onClick ={() => signout()}>
            <h4>Log out @alpa110</h4>
        </div>
    )
}

export default Logout
