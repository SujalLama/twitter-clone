import React, {useState} from 'react'
import { useDropzone } from 'react-dropzone';
import { useSelector } from 'react-redux';
import './edit-profile.css'

const EditProfile = ({setEditActive}) => {
    const [namefield, setNameField] = useState('');
    const [biofield, setBioField] = useState('');
    const [locationfield, setLocationField] = useState('');
    const [files, setFiles] = useState([])

      //redux data fetching
    const userData = useSelector(state => state.userProfile)
    const {loading, error, userProfile} = userData;

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
        <form className="edit-form-container" onSubmit={(e) => e.preventDefault()}>
            <div className="edit-form-header">
                <div>
                <i className="fas fa-times" onClick={() => setEditActive(false)}></i>
                <h4>Edit profile</h4>
                </div>
                <button className="primary-btn">Save</button>
            </div>

            {/* profile edit section */}
            <div className="profile-section-wrapper">
                <div className="profile-section">
                    <div>
                    <div className="cover-photo-edit">
                        <div className="photo-background">
                             <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <i className="far fa-image"></i>
                            </div>
                            {files.length > 0 && <i className="fas fa-times upload-close" onClick={() => setFiles([])}></i>}
                        </div>
                         {
                              files.length > 0
                                ?   <img className="cover-photo" src={files[0].preview} alt="cover photo in edit" />
                                :   (userProfile 
                                    ? (userProfile.coverPhoto !== undefined 
                                        ? 
                                        <img src={`http://localhost:5000/api/v1/files/${userProfile.coverPhoto}`}
                                         className="cover-photo" alt="cover-pic"/>
                                         : <div className="cover-photo"></div>
                                         )
                                    :  <div className="cover-photo"></div>
                                    )
                        }
                    </div>
                   <ProfilePhoto userProfile={userProfile} />
                    </div>
                </div>
            </div>

            <div className="signup-form edit-form-content">
                <div className="form-group">
                    <input value={namefield} onChange={(e) => setNameField(e.target.value)} type="text" />
                    <label id={namefield && "active"}>Username</label>
                </div>

                <div className="form-group-text-area">
                    <textarea value={biofield} onChange={(e) => setBioField(e.target.value)}  />
                    <label className="text-area-label" id={biofield && "active"}>Bio</label>
                </div>

                <div className="form-group">
                    <input value={locationfield} onChange={(e) => setLocationField(e.target.value)} type="text" />
                    <label id={locationfield && "active"}>Location</label>
                </div>
            </div>
        </form>
    )
}

function ProfilePhoto ({userProfile}) {
    const [files, setFiles] = useState([])
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
         <div className="profile-edit">
                        <div className="profile-pic">
                            <div className="photo-background user-profile-back">
                                 <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <i className="far fa-image"></i>
                                 </div>
                                 {files.length > 0 && <i className="fas fa-times upload-close" onClick={() => setFiles([])}></i>}
                            </div>
                            {
                                files.length > 0
                                ?   <img className="profile-photo-edit" src={files[0].preview} alt="profile photo in edit" />
                                :   (userProfile 
                                    ? (userProfile.profilePhoto !== undefined 
                                        && 
                                        <img src={`http://localhost:5000/api/v1/files/${userProfile.profilePhoto}`}
                                         className="profile-photo-edit" alt="profile-pic"/>)
                                    :  <img src= "/img/user-placeholder.svg" />
                                    )
                            }
                        </div>
                    </div>
    )
}

export default EditProfile
