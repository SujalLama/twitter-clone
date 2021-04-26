import {useState} from 'react';
import SignUpModal from '../../components/SignUpModal/SignUpModal';
import './first-screen.css';

const FirstScreen = () => {
    const [modalActive, setModalActive] = useState(false);
    return (
        <div className="firstScreen-container">
            {modalActive && <SignUpModal />}
            <div className="firstScreen-container--img-wrapper">
                <img src="/front-banner.jpg" alt="image of mobile screen with news" />
            </div>
            <div className="firstScreen-container--banner">
                <img className="logo" src="/twitter.svg" alt="twitter-logo" />
                <h1>Happening now</h1>
                <h4>Join Twitter today.</h4>
                <div className="firstScreen-container--btn-wrapper">
                    <button onClick={() => setModalActive(true)} className="primary-btn">Sign up</button>
                    <button className="secondary-btn">Log in</button>
                </div>
            </div>
        </div>
    )
}

export default FirstScreen
