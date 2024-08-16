import React from 'react'
import './styles/leftSideMenu.scss'
import { FaHouseChimney, FaMagnifyingGlass, FaBell, FaCirclePlus } from "react-icons/fa6";

const LeftSideMenu = ({ username }) => {
  
  return (
    <div className='leftSideMenuContainer'>
        <h1><a href="/">Social Network</a></h1>
        <ul>
            <li><a href="/"><FaHouseChimney /></a></li>
            <li><a href="/explore"><FaMagnifyingGlass /></a></li>
            <li><a href="notifications"><FaBell /></a></li>
            <li><a href="/?create=new"><FaCirclePlus /></a></li>
            <li><a href={'/'+username}>{username}</a></li>
        </ul>
    </div>
  )
}

export default LeftSideMenu