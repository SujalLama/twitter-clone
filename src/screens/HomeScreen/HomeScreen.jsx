import React, { useEffect, useState, useRef, useCallback } from 'react'
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
    const {success: deleteSuccess} = deletePost;
      const createPost = useSelector(state => state.postCreate)
    const {success: createSuccess} = createPost;
    const [commentModalActive, setCommentModalActive] = useState(false);
    const [commentActive, setCommentActive] = useState(false);
    const [postId, setPostId] = useState();
    const postList = useSelector(state => state.postList)
    const {loading, error, posts, pages, page} = postList;
    const [hasMore, setHasMore] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const [newPosts, setNewPosts] = useState([]);
    const observer = useRef();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const lastTweetElementRef = useCallback(node => {
        if(loading) return
        if(observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting && hasMore) {
                setPageNumber(prevPageNumber => prevPageNumber + 1);
            }
        })
        if(node) observer.current.observe(node);
    }, [loading, hasMore]);
    // setHasMore(posts.length > 0);
    useEffect(() => {
        if(!userProfile) dispatch(userProfileAction())
        dispatch(listPosts(pageNumber));
        setNewPosts(prevPost => [...prevPost, ...posts]);
        console.log(newPosts);
        // if(newPosts.length < (pages * 5) ) {
        //     setHasMore(false);
        // }
    }, [dispatch, deleteSuccess, createSuccess, pageNumber])

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
                data={newPosts}
                error={error}
                lastTweetElementRef={lastTweetElementRef}
                />
        </DashboardLayout>
        </>
    )
}

export default HomeScreen
