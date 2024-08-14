import { acceptFollowID } from '../utils/fetchers'
import './styles/notification.scss'
import { useEffect, useState } from 'react'

const Notification = ({ username, img, text, post, tipo, origin }) => {

    const [type, setType] = useState(null)

    useEffect(() => {
        setType(tipo)
    }, [tipo])

    const formatText = (text) => {
        return text.replace(/#(\w+)/g, '<a href="/tags/$1">#$1</a>').replace(/@(\w+)/g, '<a href="/$1">@$1</a>');
    };

    const changeURL = () => {
        if(tipo == 'like' && tipo == 'comment') {
            window.location.replace('/posts/'+origin)
        } else {
            window.location.replace(origin)
        }
    }

    const acceptFollow = async () => {
        let headers = new Headers()
        headers.append('Content-Type', 'application/json')
        let body = JSON.stringify({ username })
        let id = await fetch('http://localhost/api/users/UID', {headers, body, method:'POST', redirect:'follow'})
        id = await id.json()
        id = id.UID

        let res = await acceptFollowID(id, origin)
        console.log(res)
    }

    return (
        <div className='notificationContainer'>
            <div>
                <img src={img} />
                <p dangerouslySetInnerHTML={{ __html: formatText(text) }}></p>
            </div>
            {(type == 'request' ? <button onClick={acceptFollow}>Confirmar</button> : (type == 'newFollow' ? <button onClick={changeURL}>Ver cuenta</button> : <button onClick={changeURL}>Ver post</button>))}
        </div>
    )
}

export default Notification