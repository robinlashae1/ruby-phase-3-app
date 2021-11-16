import React from 'react'
import LoginForm from './LoginForm'

function Header({handleSearch}) {
    return (
        <div id="App-header">
            <h3>App Name</h3>
            <LoginForm />
            <input onChange={handleSearch}  type="text" id="search" placeholder="Search" />
        </div>
    )
}

export default Header