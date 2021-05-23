import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../layout/DashboardLayout/DashboardLayout'
import moment from 'moment';
import Comment from '../../components/Comment/Comment';
import { useDispatch, useSelector } from 'react-redux';
import TweetForm from '../../components/TweetForm/TweetForm';
import { userProfileAction } from '../../actions/userActions';

const SinglePost = ({match}) => {
    const [item, setItem] = useState();
    const [commentModalActive, setCommentModalActive] = useState(false);
    const [commentActive, setCommentActive] = useState(false);
    const [postId, setPostId] = useState();
    const [deleteActive, setDeleteActive] = useState(false);
    const dispatch = useDispatch();
    async function getData () {
        const {data} = await axios.get(`/api/v1/posts/${match.params.id}`);
        setItem(data.data);
    }
    const userData = useSelector(state => state.userProfile)
    const {userProfile} = userData;
    useEffect(() => {
        getData();
        dispatch(userProfileAction())
    }, [match, dispatch])

    const deletePost = (id) => {
        setDeleteActive(false);
    }

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
        <DashboardLayout name="Tweet" back="back">
            {item && <><div className="latest-tweet-container no-hover">
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
                            {
                            item.photo !== undefined 
                            ? (<div className="tweet-photos">
                                <img src={`http://localhost:5000/api/v1/files/${item.photo}`} className="tweet-photo" alt="tweet-photo"/>
                            </div>)
                            : <div></div>
                            }
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
                    {/* {
                    item.postedBy._id === userProfile._id && <div className="setting-container">
                        <i className="fas fa-ellipsis-h setting" onClick={() => setDeleteActive(!deleteActive)}></i>
                        {deleteActive && <button onClick={() => deletePost(item._id)}>Delete Post</button>}
                        </div>    
                    } */}
                </div>
                <div className="main-nav-container">
                    <ul className="main-nav">
                            <li className="active">All</li>
                    </ul>
                </div>
                {item.comments.length > 0 
                ? item.comments.map(cmtitem => <div className="comment-content">
                <div>
                    <img src={cmtitem.postedBy
                                ? (cmtitem.postedBy.profilePhoto !== undefined 
                                    ? `http://localhost:5000/api/v1/files/${cmtitem.postedBy.profilePhoto}`
                                    : "/img/user-placeholder.svg"
                                    )
                                : "/img/user-placeholder.svg"
                                } className="user-pic" alt="posting author"/>
                        <div className="comment-detail">
                        <div>
                            <h4>{cmtitem.postedBy.username}</h4>
                                        <p>@{cmtitem.postedBy.username}</p> 
                                        <span>{" . "}</span>
                                        <p>{moment(cmtitem.created).fromNow()}</p>
                        </div>
                        <p id="comment-text">{cmtitem.text}</p>
                        </div>
                    </div>
                </div>
                            )        
                : <h4 className="empty-message">No comments yet.</h4>
                }
                </>
                }
        </DashboardLayout>
        </>
    )
}


function TweetLove ({item, userProfile}) {
    const [likeActive, setLikeActive] = useState(false);

    function checkUser () {
        if(item.likes.includes(userProfile._id))
         setLikeActive(true)
    }
    useEffect(() => {
        if(userProfile){
            checkUser()
        }
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

export default SinglePost
