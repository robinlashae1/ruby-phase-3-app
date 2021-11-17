import React from 'react'
import LoginForm from './LoginForm'

function Header({handleSearch, userId, handleUserIdUpdate}) {
    return (
        <div id="App-header">
            <h3>App Track</h3>
            <LoginForm userId={userId} handleUserIdUpdate={handleUserIdUpdate} />
            <input onChange={handleSearch}  type="text" id="search" placeholder="Search" />
        </div>
    )
}

export default Header