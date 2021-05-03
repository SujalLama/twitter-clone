import {useState} from 'react'
import EditProfile from '../../components/EditProfile/EditProfile';
import DashboardLayout from '../../layout/DashboardLayout/DashboardLayout'

import './profile.css'

const Profile = () => {
    const [tweetActive, setTweetActive] = useState(true);
    const [likesActive, setLikesActive] = useState(false);
    const [editActive, setEditActive] = useState(false);

    function tweetFunc () {
        setTweetActive(true);
        setLikesActive(false);
    }

    function likesFunc () {
        setTweetActive(false);
        setLikesActive(true);
    }

    return (
        <div className="profile-wrapper">
        {editActive && <div className="edit-form-wrapper">
            <div><EditProfile setEditActive={setEditActive}/></div>
            </div>}
        <DashboardLayout name="Sujal" back="back">
           <div className="profile-section">
               <div>
               <div className="cover-photo">
                   <img src="/img/space.jpg" />
               </div>
               <div className="profile-edit">
                   <div className="profile-pic">
                       <img src="/img/author.jpg" />
                   </div>
                   <button className="secondary-btn" onClick={() => setEditActive(true)}>Edit profile</button>
               </div>
               </div>
               <div className="profile-desc">
                   <h4>Alpa</h4>
                   <h6>@alpa110</h6>
                   <div className="profile-details">
                        <div>
                            <i className="fas fa-map-marker-alt"></i> <span>Ktm, Nepal</span>
                        </div>
                        <div>
                            <i className="fas fa-calendar-check"></i> <span>Joined March 2018</span>
                        </div>
                   </div>
                   <div className="profile-status">
                        <div>
                            <h5>685</h5><span>Following</span>
                        </div>
                        <div>
                            <h5>118</h5><span>Followers</span>
                        </div>
                   </div>
               </div>
           </div>
           <div className="main-nav-container">
           <ul className="main-nav">
                <li className={tweetActive && "active"} onClick={() => tweetFunc()}>Tweets</li>
                <li className={likesActive && "active"} onClick={() => likesFunc()}>Likes</li>
           </ul>
           </div>
           {
               tweetActive 
               ? <>
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
                </div>
               </>
               : <>
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
                </div>
               </>
           }
        </DashboardLayout>
        </div>
    )
}

export default Profile
