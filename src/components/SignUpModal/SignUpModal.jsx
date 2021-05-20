import {useState, useEffect} from 'react'
import './signup-modal.css';
import {register} from '../../actions/userActions';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router';

const SignUpModal = () => {
    const [passfield, setPassField] = useState('');
    const [repassfield, setRePassField] = useState('');
    const [emailfield, setEmailField] = useState('');
    const [firstNamefield, setFirstNameField] = useState('');
    const [lastNamefield, setLastNameField] = useState('');
    const [usernamefield, setUsernameField] = useState('');
    
    //error handling
    const [emailError, setEmailError] = useState(false);
    
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
    }, [emailfield])
    
    function registerUser () {
        if(passfield === repassfield) {
            dispatch(register(firstNamefield, lastNamefield, usernamefield, emailfield, passfield))
        } 
    }

    return (
        <div className="signup-container">
            <div className="signup-inner-container">
            <div className="signup-header">
             <img src="/img/twitter.svg" alt="logo"/>
             </div>
             <form className="signup-form" onSubmit={(e) => e.preventDefault()}>
                 <h2>Create your account</h2>
                 {loading ? <h4>Loading...</h4> : error ? <h4>{error}</h4> : <></>}
                 <div className="signup-form-row">
                    <div className="form-group">
                        <input value={firstNamefield} onChange={(e) => setFirstNameField(e.target.value)} type="text" />
                        <label id={firstNamefield && "active"}>First Name</label>
                    </div>
                    <div className="form-group">
                        <input value={lastNamefield} onChange={(e) => setLastNameField(e.target.value)} type="text" />
                        <label id={lastNamefield && "active"}>Last Name</label>
                    </div>
                 </div>
                  <div className="form-group">
                        <input value={usernamefield} onChange={(e) => setUsernameField(e.target.value)} type="text" />
                        <label id={usernamefield && "active"}>Username</label>
                    </div>
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
             </form>
            </div>  
        </div>
    )
}

export default SignUpModal
