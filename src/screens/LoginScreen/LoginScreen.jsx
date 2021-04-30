import React, {useState} from 'react'
import './login-screen.css'

const LoginScreen = () => {
    const [namefield, setNameField] = useState('');
    const [passwordfield, setPasswordField] = useState('');
   
    return (
        <div className="login-container">
        <img src="/img/twitter.svg" className="logo"/>
             <form className="signup-form" onSubmit={(e) => e.preventDefault()}>
                 <h2>Create your account</h2>
                 <div className="form-group">
                    <input value={namefield} onChange={(e) => setNameField(e.target.value)} type="text" />

                    {/* active className: to keep the label on top when the input is not in focus */}
                    <label id={namefield && "active"}>Phone, email, or username</label>
                 </div>
                 <div className="form-group">
                    <input value={passwordfield} onChange={(e) => setPasswordField(e.target.value)} type="password" />
                    <label id={passwordfield && "active"}>Password</label>
                 </div>
                 <div className="btn-group">
                <button className="primary-btn" disabled>Log In</button>

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
