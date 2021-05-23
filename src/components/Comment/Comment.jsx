import React, {useState} from 'react'
import moment from 'moment'
import './comment.css';

const Comment = ({data, userProfile}) => {
    return (
       <>
        <div className="comment-content-wrapper">
       {data && data.map(cmtitem => <CommentSingle userProfile={userProfile} cmtitem={cmtitem} />)}
        </div>
       </>
    )
}

function CommentSingle ({userProfile, cmtitem}) {
    const [deleteActive, setDeleteActive] = useState(false);
     const deleteComment = (id) => {
        setDeleteActive(false);
    }

    return (
        <div className="comment-content">
           <div>
            <img src={cmtitem.postedBy
                        ? (cmtitem.postedBy.profilePhoto !== undefined 
                            ? `http://localhost:5000/api/v1/files/${cmtitem.postedBy.profilePhoto}`
                            : "/img/user-placeholder.svg"
                            )
                        : "/img/user-placeholder.svg"
                        } className="user-pic" alt="posting author"/>
                <div className="comment-detail">
                <div>
                    <h4>{cmtitem.postedBy.username}</h4>
                                <p>@{cmtitem.postedBy.username}</p> 
                                <span>{" . "}</span>
                                <p>{moment(cmtitem.created).fromNow()}</p>
                </div>
                <p id="comment-text">{cmtitem.text}</p>
                </div>
            </div>
            {
            cmtitem.postedBy._id === userProfile._id && <div className="setting-container position-comment">
                <i className="fas fa-ellipsis-h setting" onClick={() => setDeleteActive(!deleteActive)}></i>
                {deleteActive && <button onClick={() => deleteComment(cmtitem._id)}>Delete Post</button>}
                </div>
            }
        </div>
    )
}
export default Comment
