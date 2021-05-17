import {useState, useEffect} from 'react'
import './signup-modal.css';
import {register} from '../../actions/userActions';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router';

const SignUpModal = () => {
    const [inputActive, setInputActive] = useState(false);
    const [namefield, setNameField] = useState('');
    const [passfield, setPassField] = useState('');
    const [repassfield, setRePassField] = useState('');
    const [emailfield, setEmailField] = useState('');
    const [phonefield, setPhoneField] = useState('');

    const [emailError, setEmailError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);

    const dispatch = useDispatch();
    const userAuth = useSelector(state => state.userRegister)
    const {loading, error, userInfo} = userAuth;
    // validation and showing error through regex

    const history = useHistory();

    useEffect(() => {
        if(userInfo) {
            history.push('/home')
        }
    }, [history, userInfo])

    useEffect(() => {
        
        if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(emailfield)) {
            setEmailError(false);
        } else if(!emailfield) setEmailError(false)
        else
        {
            setEmailError(true);
        }

        if(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(phonefield)) {
            setPhoneError(false);
        }  else if(!phonefield) setPhoneError(false)
        else {
            setPhoneError(true);
        }
    }, [emailfield, phonefield])
    
    function registerUser () {
        if(passfield === repassfield) {
            dispatch(register(emailfield, passfield))
        } 
    }

    return (
        <div className="signup-container">
            <div className="signup-inner-container">
            <div className="signup-header">
             <img src="/img/twitter.svg" />
             {/* <button className="primary-btn size" disabled>Register</button> */}
             </div>
             <form className="signup-form" onSubmit={(e) => e.preventDefault()}>
                 <h2>Create your account</h2>
                 {loading ? <h4>Loading...</h4> : error ? <h4>{error}</h4> : <></>}
                  <div className={emailError ? "form-group email-error": "form-group"}>
                    <input value={emailfield} onChange={(e) => setEmailField(e.target.value)} type="text" />
                    <label id={emailfield && "active"}>Email</label>
                 </div>

                 <div className="form-group">
                    <input value={passfield} onChange={(e) => setPassField(e.target.value)} type="password" />

                    {/* active className: to keep the label on top when the input is not in focus */}
                    <label id={passfield && "active"}>Password</label>
                 </div>

                 <div className="form-group">
                    <input value={repassfield} onChange={(e) => setRePassField(e.target.value)} type="password" />

                    {/* active className: to keep the label on top when the input is not in focus */}
                    <label id={repassfield && "active"}>Re-type Password</label>
                 </div>
                 
                 <button className="primary-btn size" onClick={() => registerUser()}>Register</button>
                 {/* {inputActive 
                 ? <div className={emailError ? "form-group email-error": "form-group"}>
                    <input value={emailfield} onChange={(e) => setEmailField(e.target.value)} type="text" />
                    <label id={emailfield && "active"}>Email</label>
                 </div>
                 : <div className={phoneError ? "form-group email-error": "form-group"}>
                    <input value={phonefield} onChange={(e) => setPhoneField(e.target.value)} type="text" />
                    <label id={phonefield && "active"}>Phone</label>
                 </div>} */}
                 {/* <button className="change-button" onClick={() => setInputActive(!inputActive)}>{inputActive ? "Use phone instead" : "Use email instead"}</button> */}

                {/* <div className="birthday">
                    <h4>Date of birth</h4>
                    <p>This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.</p>
                    <div className="option-container">
                    <select>
                        <option value="january">January</option>
                    </select>
                    <select>
                        <option value="1">1</option>
                    </select>
                    <select>
                        <option value="1">1</option>
                    </select>
                    </div>
                </div> */}
             </form>
            </div>  
        </div>
    )
}

export default SignUpModal
