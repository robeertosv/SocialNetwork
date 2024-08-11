import React, { useEffect, useState } from 'react'
import { checkUsername, fetchProfile } from '../utils/fetchers'
import LeftSideMenu from '../components/LeftSideMenu'
import '../styles/profile.scss'

const Profile = () => {
  const username = window.location.pathname.split('/')[1]
  const [isVerified, setIsVerified] = useState(false)
  const [profilePic, setProfilePic] = useState('no-profile.jpg')
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [followers, setFollowers] = useState(0)
  const [follows, setFollows] = useState(0)

  useEffect(() => {
    async function replaceIfNeed() {
      const existe = await checkUsername(username)
      if (!existe && username != '404') { window.location.replace('/404') }
    } replaceIfNeed()

    async function getProfileData() {
      const { nombre, biografia, pic, verified, seguidores, seguidos } = await fetchProfile(username)
      setName(nombre)
      setBio(biografia)
      setIsVerified(verified)
      setFollowers(seguidores)
      setFollows(seguidos)

      if(pic != '') {
        setProfilePic(pic)
      }
    } getProfileData()

  }, [])

  return (
    <div className='profileContainer'>
      <LeftSideMenu />
      <div className="profileContent">
        <div className="profileInfo">
          <div className="userInfo">
            <img src="no-profile.jpg" alt="Account's profile pic" />
            <div className="inline">
              <div className="nameContainer">
                <h1>{name}</h1>
                {isVerified ? (<img src="verified.png" alt="" />) : ''}
              </div>
              <button>Seguir</button>
            </div>
            <p>@{username}</p>
            <h2>{bio}</h2>
          </div>
          <div className="userFollow">
            <p>{followers} <strong>followers</strong></p>
            <p>{follows} <strong>followed</strong></p>
          </div>
        </div>
        <div className="profilePosts">
          POSTS
        </div>
      </div>
    </div>
  )
}

export default Profile