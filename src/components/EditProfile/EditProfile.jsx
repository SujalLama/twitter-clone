import React, {useState} from 'react'
import './edit-profile.css'

const EditProfile = ({setEditActive}) => {
    const [namefield, setNameField] = useState('');
    const [biofield, setBioField] = useState('');
    const [locationfield, setLocationField] = useState('');
    const [websitefield, setWebsiteField] = useState('');

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
                    <div className="cover-photo">
                        <img src="/img/space.jpg" />
                    </div>
                    <div className="profile-edit">
                        <div className="profile-pic">
                            <img src="/img/author.jpg" />
                        </div>
                    </div>
                    </div>
                </div>
            </div>

            <div className="signup-form edit-form-content">
                <div className="form-group">
                    <input value={namefield} onChange={(e) => setNameField(e.target.value)} type="text" />
                    <label id={namefield && "active"}>Name</label>
                </div>

                <div className="form-group-text-area">
                    <textarea value={biofield} onChange={(e) => setBioField(e.target.value)}  />
                    <label className="text-area-label" id={biofield && "active"}>Bio</label>
                </div>

                <div className="form-group">
                    <input value={locationfield} onChange={(e) => setLocationField(e.target.value)} type="text" />
                    <label id={locationfield && "active"}>Location</label>
                </div>

                <div className="form-group">
                    <input value={websitefield} onChange={(e) => setWebsiteField(e.target.value)} type="text" />
                    <label id={websitefield && "active"}>Website</label>
                </div>
            </div>
        </form>
    )
}

export default EditProfile
