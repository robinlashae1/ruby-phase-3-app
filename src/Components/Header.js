import React from 'react'

function Header({handleSearch}) {
    return (
        <div>
            <h3>App Name</h3>
            <input onChange={handleSearch}  type="text" id="search" placeholder="Search" />
        </div>
    )
}

export default Header