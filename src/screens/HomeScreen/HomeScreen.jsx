import React, { useEffect } from 'react'
import TweetForm from '../../components/TweetForm/TweetForm'
import DashboardLayout from '../../layout/DashboardLayout/DashboardLayout';
import {useDispatch, useSelector} from 'react-redux';
import {listPosts} from '../../actions/postActions';
import moment from 'moment';

import './home-screen.css'

const HomeScreen = () => {
    const dispatch = useDispatch()
    const postList = useSelector(state => state.postList)
    const {loading, error, posts} = postList

    useEffect(() => {
        dispatch(listPosts());
    }, [dispatch])

    return (
        <>
        <DashboardLayout name="Home">
                <div className="tweet-form-wrapper"><TweetForm /></div>
                {/* latest tweets come here */}
                {loading ? <h2>loading ...</h2> : error ? <h3>{error}</h3> : (
                    posts && posts.map( item => {
                    return (<div className="latest-tweet-container">
                     <img src={`http://localhost:5000/api/v1/files/${item.postedBy.profilePhoto}`} className="user-pic" alt="posting author"/>
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
                                <div className="tweet-comment">
                                <i className="far fa-comment-alt" /><span>{item.comments.length}</span>
                                </div>
                                <div className="tweet-love">
                                <i className="far fa-heart" /><span>{item.likes.length}</span>
                                </div>
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

export default HomeScreen
