import React from 'react'
import "./tweet-form.css"

const TweetForm = () => {
    return (
        <div className="tweet-form-container">
            <img src="/img/author.jpg" alt="author" className="user-pic"/>
            <div className="tweet-content">
                 <textarea placeholder="What's happening" row="12"/>
                 <div className="tweet-form-footer">
                     <div>
                    <i className="fas fa-image"></i>
                    <i className="fas fa-smile"></i>
                    </div>
                    <button className="primary-btn">Tweet</button>
                </div>
            </div>
        </div>
    )
}

export default TweetForm
