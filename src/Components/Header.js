import React from 'react'

function Header({handleSearch}) {
    return (
        <div id="App-header">
            <h3>App Name</h3>
            <input onChange={handleSearch}  type="text" id="search" placeholder="Search" />
        </div>
    )
}

export default Header