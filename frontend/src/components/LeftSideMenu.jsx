import React from 'react'
import './styles/leftSideMenu.scss'

const LeftSideMenu = ({ username }) => {
  console.log(username)
  return (
    <div className='leftSideMenuContainer'>
        <h1><a href="/">Social Network</a></h1>
        <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/home">Home</a></li>
            <li><a href="/home">Home</a></li>
            <li><a href="/home">Home</a></li>
            <li><a href="/home">Home</a></li>
            <li><a href="/home">Home</a></li>
            <li><a href={'/'+username}>{username}</a></li>
        </ul>
    </div>
  )
}

export default LeftSideMenu