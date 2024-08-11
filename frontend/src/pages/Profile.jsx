import React, { useEffect } from 'react'
import { checkUsername } from '../utils/fetchers'

const Profile = () => {
  const username = window.location.pathname.split('/')[1]

  useEffect(() => {
    async function replaceIfNeed() {
      const existe = await checkUsername(username)
      
      if (!existe && username != '404') { window.location.replace('/404') }
    }
    replaceIfNeed()

  }, [])

  return (
    <div>Profile</div>
  )
}

export default Profile