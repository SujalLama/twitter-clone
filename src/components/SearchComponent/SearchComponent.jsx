import React from 'react'
import './search-component.css'

const SearchComponent = () => {
    return (
         <div className="search-bar">
            <input type="text" placeholder="Search Twitter" />
            <i className="fas fa-search" />
         </div>
    )
}

export default SearchComponent
