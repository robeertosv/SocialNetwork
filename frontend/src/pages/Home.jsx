import React from 'react'
import LeftSideMenu from '../components/LeftSideMenu'
import Create from '../components/Create'
import Feed from '../components/Feed'
import '../styles/home.scss'

const Home = () => {
    return (
        <div className='homeContainer'>
            <div className="homeLeft">
                <LeftSideMenu />
            </div>
            <div className="homeRight">
                <Create />
                <Feed />
            </div>
        </div>
    )
}

export default Home