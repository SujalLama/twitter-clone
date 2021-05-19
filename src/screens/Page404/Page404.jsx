import React from 'react'
import { Link } from 'react-router-dom'
import "./page-404.css"

const Page404 = ({location}) => {
    return (
        <div className="page-not-found">
            Page Not found for {location.pathname}.
            <span>
            Go Back. <Link to="/">Home</Link>
            </span>
        </div>
    )
}

export default Page404
