import {useState, useEffect} from 'react';
import SignUpModal from '../../components/SignUpModal/SignUpModal';
import './first-screen.css';
import {useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';

const FirstScreen = () => {
    const [modalActive, setModalActive] = useState(false);
    const history = useHistory();
    const userLogin = useSelector(state => state.userLogin);
    const {loading, error, userInfo} = userLogin;


    useEffect(() => {
        if(userInfo) history.push('/home');
    }, [userInfo, history]);

    return (
        <div className="firstScreen-container">
            {modalActive && <SignUpModal />}
            <div className="firstScreen-container--img-wrapper">
                <img src="/img/front-banner.jpg" alt="image of mobile screen with news" />
            </div>
            <div className="firstScreen-container--banner">
                <img className="logo" src="/img/twitter.svg" alt="twitter-logo" />
                <h1>Happening now</h1>
                <h4>Join Twitter today.</h4>
                <div className="firstScreen-container--btn-wrapper">
                    <button onClick={() => setModalActive(true)} className="primary-btn">Sign up</button>
                    <button className="secondary-btn" onClick={() => history.push('/login')}>Log in</button>
                </div>
            </div>
        </div>
    )
}

export default FirstScreen
