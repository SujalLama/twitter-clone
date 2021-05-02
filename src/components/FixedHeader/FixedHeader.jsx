import React from 'react'
import { useHistory } from 'react-router'
import './fixed-header.css'

const FixedHeader = ({name, back}) => {
   const history = useHistory();

    return (
        <div className="fixed-header-bar">
            {back && <i onClick={() => history.push('/home')} className="fas fa-arrow-left back"></i>} <span>{name}</span>
        </div>
    )
}

export default FixedHeader
