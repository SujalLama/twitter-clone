import React, {useState} from 'react'
import {useHistory} from 'react-router-dom';

// components 
import FixedHeader from '../../components/FixedHeader/FixedHeader';
import Logout from '../../components/Logout/Logout';
import SearchComponent from '../../components/SearchComponent/SearchComponent';
import TweetForm from '../../components/TweetForm/TweetForm';

// styling
import './dashboard-layout.css';

const DashboardLayout = ({children, name, back}) => {
    const [tweetActive, setTweetActive] = useState(false);
    const [logoutActive, setLogoutActive] = useState(false);
    const history = useHistory();
    return (
         <>
        {tweetActive && <div className="twitter-modal-container">
                <div className="twitter-modal-wrapper">
                    <i className="fas fa-times" onClick={() => setTweetActive(false)}></i>
                    <div>
                    <TweetForm />
                    </div>
                    </div>
                </div>}

        <div className="home-container">
            {/* navbar */}
            <div className="nav-bar-container">
                <img src="/img/twitter.svg" className="nav-bar-logo" alt="logo"/>
                <ul className="nav-bar">
                    <li className="nav-item" onClick={() => history.push("/home")}><i className="fas fa-home"></i> <span>Home</span></li>
                    <li className="nav-item" onClick={() => history.push("/notifications")}><i className="far fa-bell"></i><span>Notifications</span></li>
                    <li className="nav-item" onClick={() => history.push("/messages")}><i className="far fa-envelope"></i> <span>Messages</span></li>
                    <li className="nav-item" onClick={() => history.push("/profile")}><i className="far fa-user"></i> <span>Profile</span></li>
                </ul>
                <button className="primary-btn" onClick={() => setTweetActive(true)}>Tweet</button>

                <div className="logout-wrapper">
                     {logoutActive && <Logout />}
                <div className={logoutActive ? "logout-section active" : "logout-section"} onClick={() => setLogoutActive(!logoutActive)}>
                    <img src="/img/author.jpg" className="user-pic" alt="profile-pic"/>
                    <div className="user-detail">
                        <h4>Sujal</h4>
                        <p>username</p>
                    </div>
                    <i className="fas fa-ellipsis-h"></i>
                </div>
                </div>
            </div>
            <main className="main-section">
                <FixedHeader name={name} back={back}/>
                {/* children */}
                {children}
            </main>

            <section className="sidebar">
               <SearchComponent />
                <div className="trends-container">
                    <h4>Trends for you</h4>
                    <div className="latest-trends">
                        <div className="latest-trends-content">
                            <h6>Trending in Nepal</h6>
                            <h4>Covid</h4>
                            <h6>2.2M Tweets</h6>
                        </div>
                        <i className="fas fa-ellipsis-h setting"></i>
                    </div>
                    <div className="latest-trends">
                        <div className="latest-trends-content">
                            <h6>Trending in Nepal</h6>
                            <h4>Covid</h4>
                            <h6>2.2M Tweets</h6>
                        </div>
                        <i className="fas fa-ellipsis-h setting"></i>
                    </div>
                    <div className="latest-trends">
                        <div className="latest-trends-content">
                            <h6>Trending in Nepal</h6>
                            <h4>Covid</h4>
                            <h6>2.2M Tweets</h6>
                        </div>
                        <i className="fas fa-ellipsis-h setting"></i>
                    </div>
                    <div className="latest-trends">
                    <button className="change-button">Show more</button>
                    </div>
                </div>
            </section>
            {/* <div className="message-bar-fixed">
                message-bar
            </div> */}
        </div>
        </>
    )
}

export default DashboardLayout
