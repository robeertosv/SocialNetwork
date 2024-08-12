import React, { useEffect, useState } from 'react'
import { checkUsername, fetchProfile, getUserPosts } from '../utils/fetchers'
import LeftSideMenu from '../components/LeftSideMenu'
import Post from '../components/Post'
import '../styles/profile.scss'

const Profile = () => {
  const username = window.location.pathname.split('/')[1]
  const [isVerified, setIsVerified] = useState(false)
  const [isPrivate, setIsPrivate] = useState(true)
  const [profilePic, setProfilePic] = useState('no-profile.jpg')
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [followers, setFollowers] = useState(0)
  const [follows, setFollows] = useState(0)
  const [posts, setPosts] = useState({ posts: [] })

  const [userData, setUserData] = useState({})

  useEffect(() => {
    async function replaceIfNeed() {
      const existe = await checkUsername(username)
      if (!existe && username != '404') { window.location.replace('/404') }
    } replaceIfNeed()

    async function getProfileData() {
      const { nombre, biografia, pic, verified, privada, seguidores, seguidos } = await fetchProfile(username)
      setName(nombre)
      setBio(biografia)
      setIsVerified(verified)
      setFollowers(seguidores)
      setFollows(seguidos)
      setIsPrivate(privada)
      if(!privada) { gposts()}
      

      if (pic != '') {
        setProfilePic(pic)
      }
    } getProfileData()

    async function gposts() {
        const post = await getUserPosts(username)
        setPosts(post)
    } 

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
    <div className='profileContainer'>
      <LeftSideMenu username={userData.username} />
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
          
          {
            // TODO: Permitir acceso si la cuenta es publica o si el usuario loggeado sigue a la cuenta
            (isPrivate == false) ? (
              
              posts.posts != [] ? (
                posts.posts.map((item, idx) => (
                  <Post
                    key={idx}
                    username={username}
                    profilePic={profilePic}
                    isVerified={isVerified}
                    postText={item.textContent}
                    postImage={item.isImage ? item.image : null}
                    likes={item.likes}
                    comments={item.comments.length}
                  />
                ))
              ) : (<p>Loading posts...</p>)
            ) : (<div className='privateAccount'><img src="lock.png" alt="" /> <p>LA CUENTA ES PRIVADA</p></div>)
          }
        </div>
      </div>
    </div>
  )
}

export default Profile