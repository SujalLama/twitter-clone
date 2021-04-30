import {useState, useEffect} from 'react'
import './signup-modal.css';

const SignUpModal = () => {
    const [inputActive, setInputActive] = useState(false);
    const [namefield, setNameField] = useState('');
    const [emailfield, setEmailField] = useState('');
    const [phonefield, setPhoneField] = useState('');

    const [emailError, setEmailError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);

    // validation and showing error through regex
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
    
    return (
        <div className="signup-container">
            <div className="signup-inner-container">
            <div className="signup-header">
             <img src="/img/twitter.svg" />
             <button className="primary-btn size" disabled>Next</button>
             </div>
             <form className="signup-form" onSubmit={(e) => e.preventDefault()}>
                 <h2>Create your account</h2>
                 <div className="form-group">
                    <input value={namefield} onChange={(e) => setNameField(e.target.value)} type="text" />

                    {/* active className: to keep the label on top when the input is not in focus */}
                    <label id={namefield && "active"}>Name</label>
                 </div>
                 {inputActive 
                 ? <div className={emailError ? "form-group email-error": "form-group"}>
                    <input value={emailfield} onChange={(e) => setEmailField(e.target.value)} type="text" />
                    <label id={emailfield && "active"}>Email</label>
                 </div>
                 : <div className={phoneError ? "form-group email-error": "form-group"}>
                    <input value={phonefield} onChange={(e) => setPhoneField(e.target.value)} type="text" />
                    <label id={phonefield && "active"}>Phone</label>
                 </div>}
                 <button className="change-button" onClick={() => setInputActive(!inputActive)}>{inputActive ? "Use phone instead" : "Use email instead"}</button>

                <div className="birthday">
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
                </div>
             </form>
            </div>  
        </div>
    )
}

export default SignUpModal
