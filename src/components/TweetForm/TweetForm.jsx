import axios from 'axios';
import React, {useState} from 'react'
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../actions/postActions';
import "./tweet-form.css"

const TweetForm = ({setTweetActive, tweetActive, btnName, placeholder, postId, setCommentActive}) => {
    const userData = useSelector(state => state.userProfile)
    const dispatch = useDispatch();
    const {loading, error, userProfile} = userData;
    const [files, setFiles] = useState([])
    const [text, setText] = useState('');

           //for photo upload
    const { getRootProps, getInputProps } = useDropzone({
            accept: "image/*",
            onDrop: (acceptedFiles) => {
                setFiles(
                acceptedFiles.map((file) =>
                    Object.assign(file, {
                    preview: URL.createObjectURL(file)
                    })
                )
                )
            }
            })
    
            async function createTweet() {
                const tweetPhoto = new FormData();
                await tweetPhoto.append('file', files[0]);
                dispatch(createPost(text, tweetPhoto));
                if(tweetActive) setTweetActive(false);
                setText('');
                setFiles([]);
            }

            function replyTweet() {
                axios.put('/api/v1/posts/comment', {postId, userId: userProfile._id, text})
                setText('');
                setTweetActive(false);
                setCommentActive(true);
            }

    return (
        <div className="tweet-form-container">
            {
            userProfile
            ? <img src={userProfile.profilePhoto === undefined ? "/img/user-placeholder.svg" : `http://localhost:5000/api/v1/files/${userProfile.profilePhoto}`} className="user-pic" alt="profile-pic"/>
            : <img src= "/img/user-placeholder.svg" className="user-pic" alt="profile-pic"/>
            }
            <div className="tweet-content">
                 <textarea placeholder={placeholder || "What's happening"} row="12" value={text} onChange={(e) => setText(e.target.value)} />
                 {files.length > 0 && <div className="avatar-container">
                     <i className="fas fa-times-circle" onClick={() => setFiles([])}></i>
                     <img className="avatar" src={files[0].preview} /> </div>}
                 <div className="tweet-form-footer">
                    {btnName 
                    ? <div></div> 
                    : <div>
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <i className="fas fa-image"></i>
                    </div>
                    <i className="fas fa-smile"></i>
                    </div>}
                    {btnName 
                    ? <button className="primary-btn" disabled={!text} onClick={() => replyTweet()}>{btnName}</button>
                    : <button className="primary-btn" disabled={!text} onClick={() => createTweet()}>Tweet</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default TweetForm
