import React, {useEffect, useState} from 'react'
import { useDispatch} from 'react-redux';
import moment from 'moment';
import axios from 'axios';

import './latest-tweet.css';
import Comment from '../Comment/Comment';
import { useHistory } from 'react-router';
import { deletePost } from '../../actions/postActions';

const LatestTweet = ({
    userProfile,
    commentActive,
    setCommentActive,
    setCommentModalActive,
    commentModalActive,
    setPostId,
    loading,
    error,
    data,
    name,
    showcomments
}) => {
    
    const [settingActive, setSettingActive] = useState(true);
    
    const history = useHistory();
    return (
        <div>
            {loading ? <h2>loading ...</h2> : error ? <h3>{error}</h3> : (
                    data.length > 0 ? data.map( item => {
                    return (<div className="latest-tweet-container" >
                     <img src={item.postedBy
                     ? (item.postedBy.profilePhoto !== undefined 
                        ? `http://localhost:5000/api/v1/files/${item.postedBy.profilePhoto}`
                        : "/img/user-placeholder.svg"
                        )
                    : "/img/user-placeholder.svg"
                    } className="user-pic" alt="posting author"/>
                     <div className="latest-tweet--header-content" onClick={() => history.push(`posts/${item._id}`)}>
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
                            item.photo && <div className="tweet-photos">
                                <img src={`http://localhost:5000/api/v1/files/${item.photo}`} className="tweet-photo" alt="tweet-photo"/>
                            </div>
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
                            {item.comments.length > 0 && (showcomments && <Comment data={item.comments} userProfile={userProfile} />)}
                    </div>
                    <SettingComponent settingActive={settingActive} item={item} />
                </div>)
                    })
                : <h4 className="empty-message">You don't have any {name} yet.</h4> 
                )}
        </div>
    )
}

function SettingComponent ({settingActive, item, history})  {
    const [deleteActive, setDeleteActive] = useState(false);
    const dispatch = useDispatch();
     const deleteAPost = async (id) => {
         dispatch(deletePost(id))
        setDeleteActive(false);
    }
    return (<>
        {settingActive && <div className="setting-container">
            <i className="fas fa-ellipsis-h setting" onClick={() => setDeleteActive(!deleteActive)}></i>
            {deleteActive && <button onClick={() => deleteAPost(item._id)}>Delete Post</button>}
            </div>
        }
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

export default LatestTweet
