import {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { userProfileAction } from '../../actions/userActions';
import TweetForm from '../../components/TweetForm/TweetForm';
import DashboardLayout from '../../layout/DashboardLayout/DashboardLayout';
import moment from 'moment';
import { Redirect, useHistory } from 'react-router';

const UserProfile = ({match}) => {
    const [commentModalActive, setCommentModalActive] = useState(false);
    const [commentActive, setCommentActive] = useState(false);
    const [postId, setPostId] = useState();
    const [user, setUser] = useState();
    const [posts, setPosts] = useState([]);

    //redux data fetching
    const userData = useSelector(state => state.userProfile)
    const {userProfile} = userData;
    const dispatch = useDispatch();

    async function getUser () {
        const {data} = await axios.get(`/api/v1/auth/users/${match.params.id}`)
        console.log(data.data);
        setUser(data.data);
        setPosts(data.data.posts);
    }

    const history = useHistory();
    useEffect(() => {
        dispatch(userProfileAction())
        getUser();   
    }, [match])

    return (
        <div className="profile-wrapper">
                   {commentModalActive && <div className="twitter-modal-container">
                <div className="twitter-modal-wrapper">
                    <i className="fas fa-times" onClick={() => setCommentModalActive(false)}></i>
                    <div>
                    <TweetForm postId={postId} btnName="Reply" placeholder="Tweet your reply" 
                    setTweetActive={setCommentModalActive} 
                    tweetActive={commentModalActive} 
                    setCommentActive={setCommentActive}
                    />
                    </div>
                </div>
                </div>}
        <DashboardLayout name={user 
        ? (user.firstname === undefined 
            ? "name" : user.firstname)
        : "name"
        } back="back">
           <div className="profile-section">
               <div>
               <div className="cover-photo">
                   {
                         user
                        ? (user.coverPhoto === undefined 
                        ? <div className="cover-photo"></div>
                        : <img src={`http://localhost:5000/api/v1/files/${user.coverPhoto}`} className="cover-photo" alt="cover-pic"/>)
                        : <div className="cover-photo"></div>
                    }
               </div>
               <div className="profile-edit">
                   <div className="profile-pic">
                        {
                            user
                            ? <img src={user.profilePhoto === undefined ? "/img/user-placeholder.svg" : `http://localhost:5000/api/v1/files/${user.profilePhoto}`} className="user-pic" alt="profile-pic"/>
                            : <img src= "/img/user-placeholder.svg" className="user-pic" alt="profile-pic"/>
                        }
                    </div>
                   <button className="secondary-btn">Follow</button>
               </div>
               </div>
               <div className="profile-desc">
                   <h4>{user 
                    ? (user.firstname === undefined 
                        ? "name" : user.firstname)
                    : "name"}</h4>
                   <h6>@{user 
                    ? (user.username === undefined 
                        ? "username" : user.username)
                    : "username"}</h6>
                   <div className="profile-details">
                        <div>
                            <i className="fas fa-map-marker-alt"></i> <span>{
                            user 
                            ? (user.address === undefined 
                                ? "address" : user.address)
                            : "address"
                            }</span>
                        </div>
                        <div>
                            <i className="fas fa-calendar-check"></i> <span>Joined {
                            user 
                            ? (user.created === undefined 
                                ? "date" : moment(user.created).format("MMM, YYYY"))
                            : "date"
                            }</span>
                        </div>
                   </div>
                   <div className="profile-status">
                        <div>
                            <h5> {
                            user 
                            ? (user.following === undefined 
                                ? 0 : user.following.length)
                            : 0
                            }</h5><span>Following</span>
                        </div>
                        <div>
                            <h5>{
                            user 
                            ? (user.followers === undefined 
                                ? 0 : user.followers.length)
                            : 0
                            }</h5><span>Followers</span>
                        </div>
                   </div>
               </div>
           </div>
           <div className="main-nav-container">
           <ul className="main-nav">
                <li className="active">Tweets</li>
               
           </ul>
           </div>
           { 
           posts.length > 0 
           ? posts.map(item => {
               return (
                   <div className="latest-tweet-container">
                     <div className="latest-tweet--header-content">
                            <div>
                            <h4 className="username" onClick={() => history.push(`/users/${user._id}`)}>{user.username}</h4>
                            <p>@{user.username}</p> 
                            <span>{" . "}</span>
                            <p>{moment(item.created).fromNow()}</p>
                            </div>
                            
                            <div className="tweet-content" onClick={() => history.push(`/posts/${item._id}`)}>
                                {item.text}
                            </div>
                            {
                            item.photo !== undefined 
                            ? <div className="tweet-photos" onClick={() => history.push(`posts/${item._id}`)}>
                                <img src={`http://localhost:5000/api/v1/files/${item.photo}`} className="tweet-photo" alt="tweet-photo"/>
                            </div>
                            : <></>
                            }
                    </div>
                    </div>
               )
           })
           : <h4 className="empty-message">You don't have any tweets yet.</h4> 
          }
        </DashboardLayout>
        </div>
    )
}

export default UserProfile
