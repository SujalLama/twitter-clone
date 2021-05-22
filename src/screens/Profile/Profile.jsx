import {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import EditProfile from '../../components/EditProfile/EditProfile';
import DashboardLayout from '../../layout/DashboardLayout/DashboardLayout'
import moment from 'moment';
import axios from 'axios';

import './profile.css'
import { userProfileAction } from '../../actions/userActions';
import LatestTweet from '../../components/LatestTweet/LatestTweet';

const Profile = () => {
    const [tweetActive, setTweetActive] = useState(true);
    const [likesActive, setLikesActive] = useState(false);
    const [editActive, setEditActive] = useState(false);
    const [posts, setPosts] = useState();

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
    const dispatch = useDispatch();
    
    async function getYourPosts (id) {
        tweetFunc()
        const {data} = await axios.get(`/api/v1/posts?postedBy=${id}`)
        setPosts(data.data);
    }

    async function getYourPostsLikes (id) {
        likesFunc()
        const {data} = await axios.get(`/api/v1/posts?likes=${id}`)
        setPosts(data.data);
    }
    
    useEffect(() => {
        if(!userProfile) dispatch(userProfileAction())
        if(userProfile) {
            getYourPosts(userProfile._id)
        }
        
    }, [dispatch])

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
                <li className={tweetActive && "active"} onClick={() => getYourPosts(userProfile._id)}>Tweets</li>
                <li className={likesActive && "active"} onClick={() => getYourPostsLikes(userProfile._id)}>Likes</li>
           </ul>
           </div>
           {
               tweetActive 
               ? <>
                <LatestTweet 
                data={posts}
                />
               </>
               : <>
                <LatestTweet data={posts} />
               </>
           }
        </DashboardLayout>
        </div>
    )
}

export default Profile
