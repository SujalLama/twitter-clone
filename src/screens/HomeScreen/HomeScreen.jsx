import React, {useState} from 'react'
import TweetForm from '../../components/TweetForm/TweetForm'
import './home-screen.css'

const HomeScreen = () => {
    const [tweetActive, setTweetActive] = useState(false);

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
                    <li className="nav-item"><i className="fas fa-home"></i> <span>Home</span></li>
                    <li className="nav-item"><i className="far fa-bell"></i><span>Notifications</span></li>
                    <li className="nav-item"><i className="far fa-envelope"></i> <span>Messages</span></li>
                    <li className="nav-item"><i className="far fa-user"></i> <span>Profile</span></li>
                </ul>
                <button className="primary-btn" onClick={() => setTweetActive(true)}>Tweet</button>
                <div className="logout-section">
                    <img src="/img/author.jpg" className="user-pic" alt="profile-pic"/>
                    <div className="user-detail">
                        <h4>Sujal</h4>
                        <p>username</p>
                    </div>
                    <i className="fas fa-ellipsis-h"></i>
                </div>
            </div>
            <main className="main-section">
                <div className="fixed-header-bar">Home</div>
                {/* Tweet creating form goes here */}
                <div className="tweet-form-wrapper"><TweetForm /></div>
                {/* latest tweets come here */}
                <div className="latest-tweet-container">
                     <img src="/img/author.jpg" className="user-pic" alt="posting author"/>
                       
                     <div className="latest-tweet--header-content">
                            <div>
                            <h4>Jobs at Fresh Thyme</h4>
                            <p>@FreshTymeJobs</p> 
                            <span>{" . "}</span>
                            <p>1hr</p>
                            </div>
                            <div className="tweet-content">
                                This job is amzing and I love it.
                            </div>
                            <div className="tweet-photos">
                                <img src="/img/space.jpg" className="tweet-photo" alt="tweet-photo"/>
                            </div>
                            <div className="tweet-footer">
                                <div className="tweet-comment">
                                <i className="far fa-comment-alt" /><span>3</span>
                                </div>
                                <div className="tweet-love">
                                <i className="far fa-heart" /><span>16</span>
                                </div>
                            </div>
                    </div>
                    <i className="fas fa-ellipsis-h setting" ></i>
                </div>
                <div className="latest-tweet-container">
                     <img src="/img/author.jpg" className="user-pic" alt="posting author"/>
                       
                     <div className="latest-tweet--header-content">
                            <div>
                            <h4>Jobs at Fresh Thyme</h4>
                            <p>@FreshTymeJobs</p> 
                            <span>{" . "}</span>
                            <p>1hr</p>
                            </div>
                            <div className="tweet-content">
                                This job is amzing and I love it.
                            </div>
                            <div className="tweet-photos">
                                <img src="/img/space.jpg" className="tweet-photo" alt="tweet-photo"/>
                            </div>
                            <div className="tweet-footer">
                                <div className="tweet-comment">
                                <i className="far fa-comment-alt" /><span>3</span>
                                </div>
                                <div className="tweet-love">
                                <i className="far fa-heart" /><span>16</span>
                                </div>
                            </div>
                    </div>
                    <i className="fas fa-ellipsis-h setting" ></i>
                </div>
                <div className="latest-tweet-container">
                     <img src="/img/author.jpg" className="user-pic" alt="posting author"/>
                       
                     <div className="latest-tweet--header-content">
                            <div>
                            <h4>Jobs at Fresh Thyme</h4>
                            <p>@FreshTymeJobs</p> 
                            <span>{" . "}</span>
                            <p>1hr</p>
                            </div>
                            <div className="tweet-content">
                                This job is amzing and I love it.
                            </div>
                            <div className="tweet-photos">
                                <img src="/img/space.jpg" className="tweet-photo" alt="tweet-photo"/>
                            </div>
                            <div className="tweet-footer">
                                <div className="tweet-comment">
                                <i className="far fa-comment-alt" /><span>3</span>
                                </div>
                                <div className="tweet-love">
                                <i className="far fa-heart" /><span>16</span>
                                </div>
                            </div>
                    </div>
                    <i className="fas fa-ellipsis-h setting" ></i>
                </div>
            </main>

            <section className="sidebar">
                <div className="search-bar">
                    <input type="text" placeholder="Search Twitter" />
                <i className="fas fa-search" />
                </div>

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
            <div className="message-bar-fixed">
                message-bar
            </div>
        </div>
        </>
    )
}

export default HomeScreen
