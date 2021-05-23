import React, {useState} from 'react'
import DashboardLayout from "../../layout/DashboardLayout/DashboardLayout";
import './notification.css'

const Notification = () => {

    return (
        <DashboardLayout name="Notifications">
             <div className="main-nav-container">
           <ul className="main-nav">
                <li className="active">All</li>
           </ul>
           </div>
          
                  <div className="latest-tweet-container">
                     <img src="/img/author.jpg" className="user-pic" alt="posting author"/>
                       
                     <div className="latest-tweet--header-content">
                            <div>
                            <h4>Jobs at Fresh Thyme</h4>
                            <p>@FreshTymeJobs</p> 
                            <span>{" . "}</span>
                            <p>1hr</p>
                            </div>
                            <div className="tweet-content">
                                This job is amzing and I love it.
                            </div>
                            <div className="tweet-photos">
                                <img src="/img/space.jpg" className="tweet-photo" alt="tweet-photo"/>
                            </div>
                            <div className="tweet-footer">
                                <div className="tweet-comment">
                                <i className="far fa-comment-alt" /><span>3</span>
                                </div>
                                <div className="tweet-love">
                                <i className="far fa-heart" /><span>16</span>
                                </div>
                            </div>
                    </div>
                </div>
        </DashboardLayout>
    )
}

export default Notification
