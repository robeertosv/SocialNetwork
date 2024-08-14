import '../styles/notifications.scss'
import LeftSideMenu from '../components/LeftSideMenu'
import { useEffect, useState } from 'react'
import { getUserNotifications } from '../utils/fetchers'
import Notification from '../components/Notification'

const Notifications = () => {

    const [user, setUser] = useState({}) // {username:String, notifications:Array}
    // Notification {pic, text, type, post, origin}

    useEffect(() => {
        async function getNotifications() {
            let res = await getUserNotifications()
            setUser(res)
        } getNotifications()


    }, [])

    return (
        <div className='notificationsContainer'>
            <LeftSideMenu username={user.username} />
            <div className="notifications">
                <h1>Notifications</h1>

                <ul>
                    {
                    
                        user.notifications ?
                        user.notifications.map((item, idx) => {
                            return (<li key={idx}><Notification username={user.username}  img={item.pic} text={item.text} tipo={item.type} origin={item.origin} /></li>)
                        })
                            : null
                    }
                </ul>
            </div>
        </div>
    )
}

export default Notifications