import React from 'react'
import './styles/leftSideMenu.scss'

const LeftSideMenu = ({ username }) => {
  console.log(username)
  return (
    <div className='leftSideMenuContainer'>
        <h1>Social Network</h1>
        <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/home">Home</a></li>
            <li><a href="/home">Home</a></li>
            <li><a href="/home">Home</a></li>
            <li><a href="/home">Home</a></li>
            <li><a href="/home">Home</a></li>
            <li><a href="/home">{username}</a></li>
        </ul>
    </div>
  )
}

export default LeftSideMenu