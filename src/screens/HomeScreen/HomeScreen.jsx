import React, { useEffect, useState } from 'react'
import TweetForm from '../../components/TweetForm/TweetForm'
import DashboardLayout from '../../layout/DashboardLayout/DashboardLayout';
import {useDispatch, useSelector} from 'react-redux';
import {listPosts} from '../../actions/postActions';
import moment from 'moment';
import './home-screen.css'
import { userProfileAction } from '../../actions/userActions';
import axios from 'axios';

const HomeScreen = () => {
    const dispatch = useDispatch()
    const postList = useSelector(state => state.postList)
    const userData = useSelector(state => state.userProfile)
    const {loading, error, posts} = postList;
    const {userProfile} = userData;
    const [commentModalActive, setCommentModalActive] = useState(false);
    const [commentActive, setCommentActive] = useState(false);
    const [postId, setPostId] = useState();
    
    useEffect(() => {
        if(!userProfile) dispatch(userProfileAction())
        dispatch(listPosts());
    }, [dispatch])

    return (
        <>
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
        <DashboardLayout name="Home" userProfile={userProfile} >
                <div className="tweet-form-wrapper"><TweetForm userProfile={userProfile} /></div>
                {/* latest tweets come here */}
                {loading ? <h2>loading ...</h2> : error ? <h3>{error}</h3> : (
                    posts && posts.map( item => {
                    return (<div className="latest-tweet-container">
                     <img src={item.postedBy
                     ? (item.postedBy.profilePhoto !== undefined 
                        ? `http://localhost:5000/api/v1/files/${item.postedBy.profilePhoto}`
                        : "/img/user-placeholder.svg"
                        )
                    : "/img/user-placeholder.svg"
                    } className="user-pic" alt="posting author"/>
                     <div className="latest-tweet--header-content">
                            <div>
                            <h4>{item.postedBy.username}</h4>
                            <p>@{item.postedBy.username}</p> 
                            <span>{" . "}</span>
                            <p>{moment(item.created).fromNow()}</p>
                            </div>
                            <div className="tweet-content">
                                {item.text}
                            </div>
                            <div className="tweet-photos">
                                <img src={`http://localhost:5000/api/v1/files/${item.photo}`} className="tweet-photo" alt="tweet-photo"/>
                            </div>
                            <div className="tweet-footer">
                               <TweetComment item={item} userProfile={userProfile} 
                               setCommentActive={setCommentActive} 
                               commentActive={commentActive} 
                               setPostId={setPostId}
                               commentModalActive={commentModalActive}
                               setCommentModalActive={setCommentModalActive}
                               />
                                <TweetLove item={item} userProfile={userProfile} />
                            </div>
                    </div>
                    <i className="fas fa-ellipsis-h setting" ></i>
                </div>)
                    })
                )}
                </DashboardLayout>
        </>
    )
}

function TweetLove ({item, userProfile}) {
    const [likeActive, setLikeActive] = useState(false);
    const dispatch = useDispatch()
    function checkUser () {
        if(item.likes.includes(userProfile._id))
         setLikeActive(true)
    }
    useEffect(() => {
        window.setTimeout(checkUser, 5000)
    }, [])

    const likeAPost = () => {
        setLikeActive(!likeActive)
        axios.put('/api/v1/posts/like', {postId: item._id, userId: userProfile._id})
    }
    return(
        <div className={`tweet-love ${likeActive && "active"}`} onClick={() => likeAPost()}>
            <i className={`fas fa-heart ${likeActive && "active"}`}  /><span>{likeActive ? item.likes.length + 1 : item.likes.length}</span>
        </div>
    )
}

function TweetComment ({item, userProfile, commentActive, setCommentActive, setPostId, setCommentModalActive, commentModalActive}) {
      
    const commentAPost = () => {
        setCommentModalActive(!commentModalActive)
        setPostId(item._id)
    }
    return(
        <div className={`tweet-comment ${commentActive && "active"}`} onClick={() => commentAPost()}>
            <i className={`fas fa-comment-alt ${commentActive && "active"}`}  /><span>{commentActive ? item.comments.length + 1 : item.comments.length}</span>
        </div>
    )
}
export default HomeScreen
