import React, { useEffect, useState } from 'react'
import LeftSideMenu from '../components/LeftSideMenu'
import '../styles/admin.scss'

const Admin = () => {
  const [user, setUser] = useState({})
  const [profile, setProfile] = useState({})

  useEffect(() => {
    async function getUser() {
      let res = await fetch('http://localhost/api/users/user', { credentials: 'include' })
      res = await res.json()
      if(res.username != 'admin') { window.location.replace('/') }
      console.log(res)
      setUser(res)
    } getUser()
  }, [])

  const getProfile = async () => {
    let username = document.querySelector('#username').value
    let headers = new Headers(); headers.append('Content-Type', 'application/json')
    let body = JSON.stringify({ username })

    let res = await fetch('http://localhost/api/users/getUserProfile', { headers, body, method: 'POST', redirect: 'follow' })
    res = await res.json()

    if (res.errorMessage) { return alert(res.errorMessage) }

    res = JSON.parse(res)

    setProfile(res)
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { getProfile() }
  })

  const handler = async (e) => {
    e.preventDefault()

    let headers = new Headers(); headers.append('Content-Type', 'application/json')
    let verified = document.querySelector('#verified').checked
    //if(verified == 'on') { verified = true } else {verified = false}

    let banned = document.querySelector('#banned').checked
    //if(banned == 'on') { banned = true } else {banned = false}

    let body = JSON.stringify({username: profile.username, verified, banned})

    let res = await fetch('http://localhost/api/users/adminUpdate', { headers, body, method: 'POST', credentials: 'include' })
    window.location.reload()
  }

  return (
    <div className="adminPanelContainer">
      <LeftSideMenu username={user.username} />
      <div className="adminPanel">
        <div className="searchUser">
          <input type="text" id='username' placeholder='username' />
        </div>
        <div className="userData">
          <h1>@{profile.username}</h1>
          {profile.name ? <h1>{profile.name}</h1> : null}
          {profile.username ? <img src={profile.pic != '' ? profile.pic : 'no-profile.jpg'} alt="" /> : null}
          <form onSubmit={handler}>
            <div>
              <label htmlFor="verified">Verified</label>
              <input type="checkbox" id='verified' name='verified' defaultChecked={profile.verified} />
            </div>
            <div>
              <label htmlFor="banned">Banned</label>
              <input type="checkbox" id='banned' name='banned' defaultChecked={profile.banned} />
            </div>
            <button type='submit'>Modificar</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Admin