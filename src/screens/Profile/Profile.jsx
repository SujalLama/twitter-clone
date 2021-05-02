import {useState} from 'react'
import DashboardLayout from '../../layout/DashboardLayout/DashboardLayout'

import './profile.css'

const Profile = () => {
    const [tweetActive, setTweetActive] = useState(true);
    const [likesActive, setLikesActive] = useState(false);

    function tweetFunc () {
        setTweetActive(true);
        setLikesActive(false);
    }

    function likesFunc () {
        setTweetActive(false);
        setLikesActive(true);
    }

    return (
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
                   <button className="secondary-btn">Edit profile</button>
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
        </DashboardLayout>
    )
}

export default Profile
