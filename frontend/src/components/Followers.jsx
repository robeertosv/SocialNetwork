import React, { useEffect, useState } from 'react'
import './styles/followers.scss'

const Followers = ({ username, follower, closePopUp, unFollow }) => {

    const [fList, setFList] = useState([])
    useEffect(() => {
        const getFollowers = async () => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            let body = JSON.stringify({ username });
            let options = { headers, body, method: 'POST', redirect: 'follow' };

            let url = follower
                ? 'http://localhost/api/users/getUserFollowers'
                : 'http://localhost/api/users/getUserFollows';

            if (username != null) {
                let res = await fetch(url, options);
                let data = await res.json();
                setFList(follower ? data.followers : data.follows);
            }


        };

        getFollowers();
    }, [username]);

    return (
        <div className='followerContainer'>
            <button className="close-btn" onClick={closePopUp}>X</button>
            <h1>{follower ? 'Followers' : 'Follows'}</h1>
            <ul>
                {
                    fList.map((item, idx) => {
                        return (
                            <li key={idx}>
                                <a href={'/' + item.username}>
                                    <div><img src={item.pic} />
                                        <p>{item.username}</p></div>

                                    {follower ? (<button>Delete</button>) : <button>Ver perfil</button>}
                                </a>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Followers