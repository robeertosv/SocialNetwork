import React from 'react'
import './styles/leftSideMenu.scss'

const LeftSideMenu = ({ username }) => {
  
  return (
    <div className='leftSideMenuContainer'>
        <h1><a href="/">Social Network</a></h1>
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/explore">Explore</a></li>
            <li><a href="notifications">Notifications</a></li>
            <li><a href="/?create=new">Create</a></li>
            <li><a href={'/'+username}>{username}</a></li>
        </ul>
    </div>
  )
}

export default LeftSideMenu