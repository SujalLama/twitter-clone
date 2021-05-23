import React, { useEffect, useState } from 'react'
import TweetForm from '../../components/TweetForm/TweetForm'
import DashboardLayout from '../../layout/DashboardLayout/DashboardLayout';
import {useDispatch, useSelector} from 'react-redux';
import './home-screen.css'
import { userProfileAction } from '../../actions/userActions';
import LatestTweet from '../../components/LatestTweet/LatestTweet';
import { listPosts } from '../../actions/postActions';

const HomeScreen = () => {
    const dispatch = useDispatch()
    const userData = useSelector(state => state.userProfile)
    const {userProfile} = userData;
    const deletePost = useSelector(state => state.postDelete)
    const {success} = deletePost;
    const [commentModalActive, setCommentModalActive] = useState(false);
    const [commentActive, setCommentActive] = useState(false);
    const [postId, setPostId] = useState();
    const postList = useSelector(state => state.postList)
    const {loading, error, posts} = postList;
    
    
    useEffect(() => {
        if(!userProfile) dispatch(userProfileAction())
        dispatch(listPosts());
    }, [dispatch, success])

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
                <LatestTweet 
                userProfile={userProfile}
                commentActive={commentActive}
                setCommentActive={setCommentActive}
                setCommentModalActive={setCommentModalActive}
                commentModalActive={commentModalActive}
                setPostId={setPostId}
                loading={loading}
                data={posts}
                error={error}
                />
        </DashboardLayout>
        </>
    )
}

export default HomeScreen
