import {useState} from 'react'
import { useSelector } from 'react-redux';
import EditProfile from '../../components/EditProfile/EditProfile';
import DashboardLayout from '../../layout/DashboardLayout/DashboardLayout'
import moment from 'moment';

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
    
    //redux data fetching
    const userData = useSelector(state => state.userProfile)
    const {loading, error, userProfile} = userData;

    return (
        <div className="profile-wrapper">
        {editActive && <div className="edit-form-wrapper">
            <div><EditProfile setEditActive={setEditActive}/></div>
            </div>}
        <DashboardLayout name={userProfile 
        ? (userProfile.firstname === undefined 
            ? "name" : userProfile.firstname)
        : "name"
        } back="back">
           <div className="profile-section">
               <div>
               <div className="cover-photo">
                   {
                         userProfile
                        ? (userProfile.coverPhoto === undefined 
                        ? <div className="cover-photo"></div>
                        : <img src={`http://localhost:5000/api/v1/files/${userProfile.coverPhoto}`} className="cover-photo" alt="cover-pic"/>)
                        : <div className="cover-photo"></div>
                    }
               </div>
               <div className="profile-edit">
                   <div className="profile-pic">
                        {
                            userProfile
                            ? <img src={userProfile.profilePhoto === undefined ? "/img/user-placeholder.svg" : `http://localhost:5000/api/v1/files/${userProfile.profilePhoto}`} className="user-pic" alt="profile-pic"/>
                            : <img src= "/img/user-placeholder.svg" className="user-pic" alt="profile-pic"/>
                        }
                    </div>
                   <button className="secondary-btn" onClick={() => setEditActive(true)}>Edit profile</button>
               </div>
               </div>
               <div className="profile-desc">
                   <h4>{userProfile 
                    ? (userProfile.firstname === undefined 
                        ? "name" : userProfile.firstname)
                    : "name"}</h4>
                   <h6>@{userProfile 
                    ? (userProfile.username === undefined 
                        ? "username" : userProfile.username)
                    : "username"}</h6>
                   <div className="profile-details">
                        <div>
                            <i className="fas fa-map-marker-alt"></i> <span>{
                            userProfile 
                            ? (userProfile.address === undefined 
                                ? "address" : userProfile.address)
                            : "address"
                            }</span>
                        </div>
                        <div>
                            <i className="fas fa-calendar-check"></i> <span>Joined {
                            userProfile 
                            ? (userProfile.created === undefined 
                                ? "date" : moment(userProfile.created).format("MMM, YYYY"))
                            : "date"
                            }</span>
                        </div>
                   </div>
                   <div className="profile-status">
                        <div>
                            <h5> {
                            userProfile 
                            ? (userProfile.following === undefined 
                                ? 0 : userProfile.following.length)
                            : 0
                            }</h5><span>Following</span>
                        </div>
                        <div>
                            <h5>{
                            userProfile 
                            ? (userProfile.followers === undefined 
                                ? 0 : userProfile.followers.length)
                            : 0
                            }</h5><span>Followers</span>
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
