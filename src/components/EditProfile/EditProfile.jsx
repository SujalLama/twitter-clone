import axios from 'axios';
import React, {useState} from 'react'
import { isCompositeComponentWithType } from 'react-dom/test-utils';
import Dropzone, { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { userProfileAction, userProfileEditAction } from '../../actions/userActions';
import './edit-profile.css'

const EditProfile = ({setEditActive}) => {
     //redux data fetching
    const userData = useSelector(state => state.userProfile)
    const dispatch = useDispatch();
    const {loading, error, userProfile} = userData;

    const [namefield, setNameField] = useState(userProfile.username || "Username");
    const [biofield, setBioField] = useState(userProfile.bio || "Bio");
    const [locationfield, setLocationField] = useState(userProfile.address || "Location");
    const [coverfiles, setCoverFiles] = useState([])
    const [profilefiles, setProfileFiles] = useState([])

            function addCoverPhoto (acceptedFiles) {
                setCoverFiles(
                      acceptedFiles.map((file) =>
                    Object.assign(file, {
                    preview: URL.createObjectURL(file)
                    })
                )
                )
            }

            function addProfilePhoto (acceptedFiles) {
                setProfileFiles(
                      acceptedFiles.map((file) =>
                    Object.assign(file, {
                    preview: URL.createObjectURL(file)
                    })
                )
                )
            }

            async function editProfile () {
                let {token} = JSON.parse(localStorage.getItem("userInfo"));
                    const config2 = {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    }
                }

            if(coverfiles[0]) {
                const coverPhoto = new FormData();
                    await coverPhoto.append('file', coverfiles[0]);
                await axios.post('/api/v1/auth/uploadcoverpic', coverPhoto, config2);
            }

            if(profilefiles[0]) {
                const profilePhoto = new FormData();
                    await profilePhoto.append('file', profilefiles[0]);
                await axios.post('/api/v1/auth/uploadprofilepic', profilePhoto, config2);
            }

            if(namefield || biofield || locationfield) dispatch(userProfileEditAction(namefield, biofield, locationfield))
                
            dispatch(userProfileAction());
            
            setEditActive(false);
                
            }


    return (
        <form className="edit-form-container" onSubmit={(e) => e.preventDefault()}>
            <div className="edit-form-header">
                <div>
                <i className="fas fa-times" onClick={() => setEditActive(false)}></i>
                <h4>Edit profile</h4>
                </div>
                <button className="primary-btn" onClick={() => editProfile()}>Save</button>
            </div>

            {/* profile edit section */}
            <div className="profile-section-wrapper">
                <div className="profile-section">
                    <div>
                    <div className="cover-photo-edit">
                        <div className="photo-background">
                            <Dropzone onDrop={files => addCoverPhoto(files)}>
                            {
                                ({getRootProps, getInputProps}) => (
                                     <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <i className="far fa-image"></i>
                                    </div>
                                )
                            }
                            </Dropzone>
                            
                            {coverfiles.length > 0 && <i className="fas fa-times upload-close" onClick={() => setCoverFiles([])}></i>}
                        </div>
                         {
                              coverfiles.length > 0
                                ?   <img className="cover-photo" src={coverfiles[0].preview} alt="cover photo in edit" />
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
                   <div className="profile-edit">
                        <div className="profile-pic">
                            <div className="photo-background user-profile-back">
                                  <Dropzone onDrop={files => addProfilePhoto(files)}>
                                        {
                                            ({getRootProps, getInputProps}) => (
                                                <div {...getRootProps()}>
                                                    <input {...getInputProps()} />
                                                    <i className="far fa-image"></i>
                                                </div>
                                            )
                                        }
                                    </Dropzone>
                                 {profilefiles.length > 0 && <i className="fas fa-times upload-close" onClick={() => setProfileFiles([])}></i>}
                            </div>
                            {
                                profilefiles.length > 0
                                ?   <img className="profile-photo-edit" src={profilefiles[0].preview} alt="profile photo in edit" />
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

// function ProfilePhoto ({userProfile}) {
//     const [files, setFiles] = useState([])
//      const { getRootProps, getInputProps } = useDropzone({
//             accept: "image/*",
//             onDrop: (acceptedFiles) => {
//                 setFiles(
//                 acceptedFiles.map((file) =>
//                     Object.assign(file, {
//                     preview: URL.createObjectURL(file)
//                     })
//                 )
//                 )
//             }
//             })
//     return (
         
//     )
// }

export default EditProfile
