import {useState} from 'react'
import './signup-modal.css';

const SignUpModal = () => {
    const [inputActive, setInputActive] = useState(false);
    return (
        <div className="signup-container">
            <div className="signup-inner-container">
            <div className="signup-header">
             <img src="/twitter.svg" />
             <button className="primary-btn size" disabled>Next</button>
             </div>
             <form className="signup-form" onSubmit={(e) => e.preventDefault()}>
                 <h2>Create your account</h2>
                 <div className="form-group">
                    <input type="text" />
                    <label className="active">Name</label>
                 </div>
                 <div className="form-group">
                    <input type="text" />
                    <label>{inputActive ? "Email" : "Phone"}</label>
                 </div>
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
