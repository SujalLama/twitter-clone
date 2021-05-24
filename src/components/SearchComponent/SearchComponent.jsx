import axios from 'axios'
import React, {useState, useEffect} from 'react'
import './search-component.css'

const SearchComponent = ({setUsers}) => {
    const [keyword, setKeyword] = useState('')

    async function searchUsers () {
        const {data} = await axios.get(`/api/v1/auth/users?keyword=${keyword}`)
        console.log(data.data);
        setUsers(data.data);
    }
    useEffect(() => {
        if(!keyword) {
            setUsers([])
        }
        
        if(keyword.trim()) {
            searchUsers();
        }

    }, [keyword])

    return (
         <div className="search-bar">
            <input type="text" placeholder="Search Twitter" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
            <i className="fas fa-search" />
         </div>
    )
}

export default SearchComponent
