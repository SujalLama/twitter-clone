import React, {useState} from 'react'
import { useDropzone } from 'react-dropzone';
import { useSelector } from 'react-redux';
import "./tweet-form.css"

const TweetForm = () => {
    const userData = useSelector(state => state.userProfile)
    const {loading, error, userProfile} = userData;
    const [files, setFiles] = useState([])

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

    return (
        <div className="tweet-form-container">
            {
            userProfile
            ? <img src={userProfile.profilePhoto === undefined ? "/img/user-placeholder.svg" : `http://localhost:5000/api/v1/files/${userProfile.profilePhoto}`} className="user-pic" alt="profile-pic"/>
            : <img src= "/img/user-placeholder.svg" className="user-pic" alt="profile-pic"/>
            }
            <div className="tweet-content">
                 <textarea placeholder="What's happening" row="12"/>
                 {files.length > 0 && <div className="avatar-container">
                     <i className="fas fa-times-circle" onClick={() => setFiles([])}></i>
                     <img className="avatar" src={files[0].preview} /> </div>}
                 <div className="tweet-form-footer">
                     <div>
                    <div className="file-drop-container" {...getRootProps()}>
                        <input {...getInputProps()} />
                        <i className="fas fa-image"></i>
                    </div>
                    <i className="fas fa-smile"></i>
                    </div>
                    <button className="primary-btn">Tweet</button>
                </div>
            </div>
        </div>
    )
}

export default TweetForm
