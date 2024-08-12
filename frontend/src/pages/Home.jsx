import React, { useEffect, useState } from 'react'
import LeftSideMenu from '../components/LeftSideMenu'
import Create from '../components/Create'
import Feed from '../components/Feed'
import '../styles/home.scss'

const Home = () => {

    const [userData, setUserData] = useState({})
    useEffect(() => {
        async function getUserByToken() {
            let headers = new Headers()
            headers.append('Content-Type', 'application/json')

            let options = {
                headers,
                method: 'POST',
                credentials: 'include',
                redirect: 'follow'
            }
            let res = await fetch('http://localhost/api/users/getUserByToken', options)
            res = await res.json()

            if(!res.username) { return window.location.replace('/login') }

            setUserData(res)
        } getUserByToken()

    }, [])

    return (
        <div className='homeContainer'>
            <div className="homeLeft">
                <LeftSideMenu username={userData.username}/>
            </div>
            <div className="homeRight">
                <Create />
                <Feed />
            </div>
        </div>
    )
}

export default Home