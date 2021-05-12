import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/userActions';
import './login-screen.css'

const LoginScreen = ({history}) => {
    const [namefield, setNameField] = useState('');
    const [passwordfield, setPasswordField] = useState('');
   
    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const {loading, error, userInfo} = userLogin;

    useEffect(() => {
        if(userInfo) {
            history.push('/home')
        }
    }, [history, userInfo])

     const submitForm = (e) => {
         e.preventDefault();
        dispatch(login(namefield, passwordfield));
    }

    return (
        <div className="login-container">
        <img src="/img/twitter.svg" className="logo"/>
            {error && <h4>{error}</h4>}
            {loading && <h4>{loading}</h4>}
             <form className="signup-form" onSubmit={(e) => submitForm(e)}>
                 <h2>Create your account</h2>
                 <div className="form-group">
                    <input value={namefield} onChange={(e) => setNameField(e.target.value)} type="text" />

                    {/* active className: to keep the label on top when the input is not in focus */}
                    <label id={namefield && "active"}>Phone, email, or username</label>
                 </div>
                 <div className="form-group">
                    <input value={passwordfield} onChange={(e) => setPasswordField(e.target.value)} type="password" />
                    <label id={passwordfield && "active"} >Password</label>
                 </div>
                 <div className="btn-group">
                <button className="primary-btn" disabled={!namefield && !passwordfield}>Log In</button>

                 <div className="btn-group-forgot">
                 <button className="change-button">Forgot Password ?</button> 
                 {" . "}
                 <button className="change-button">Sign up for Twitter</button>
                 </div>
                 </div>
             </form>
        </div>
    )
}

export default LoginScreen
