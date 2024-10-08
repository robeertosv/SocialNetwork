import { useEffect, useState } from 'react';
import { FaHeart, FaRegComment, FaEllipsisVertical } from "react-icons/fa6";
import './styles/post.scss'

const Post = ({ id, ownerID, viewerID, username, profilePIC, isVerified, postText, postImage, likes, comments }) => {
    const [iHTML, setIHTML] = useState()
    const [showOptions, setShowOptions] = useState(false)
    const [liked, setLiked] = useState(false)

    function format(text) {
        if (postText) { return (text.replace(/#(\w+)/g, '<a href="/explore?keyword=$1&src=postClick">#$1</a>').replace(/@(\w+)/g, '<a href="/$1">@$1</a>')) }
    }

    function showPostOptions() { setShowOptions(!showOptions) }

    const deletePostHanlder = async () => {
        let headers = new Headers()
        headers.append('Content-Type', 'application/json')

        let body = JSON.stringify({ postID: id })

        let res = await fetch('http://localhost/api/posts/delete', { headers, body, method: 'POST', credentials: 'include', redirect: 'follow' })
        res = await res.json()

        if (res.error) { alert(res.error) } else { window.location.reload() }
    }

    const likeHandler = async () => {
        let headers = new Headers()
        headers.append('Content-Type', 'application/json')
        let body = JSON.stringify({id, liked})

        let res = await fetch('http://localhost/api/posts/like', {headers, body, method:'POST', credentials:'include', redirect: 'follow'})
        res = await res.json()

        if(res.error) {  
            alert(res.error)
        }else {
            window.location.reload()
        }
    }

    useEffect(() => {
        setIHTML(format(postText))
        likes.forEach((like) => {
            if(viewerID == like) { setLiked(true) }
        })
    }, [postText])

    function viewMore() {
        window.location.pathname.includes('posts') ? null : window.location.replace('/posts/' + id)
    }
    return (
        <div className="post">
            <div className='postContainer'>
                <div className="postHeader">
                    <div className="nameContainer">
                        {profilePIC != '' && profilePIC != 'no-profile.jpg' && profilePIC != null ? (<img src={profilePIC} id='accountPic' />) : <img src='no-profile.jpg' id='accountPic' />}
                        <div>
                            <a href={'http://localhost:9000/' + username}>{username}</a>
                            {isVerified ? (<img src="verified.png" alt="" />) : null}
                        </div>
                    </div>
                    <div className="postOptions">
                        {ownerID == viewerID ? <button onClick={showPostOptions} id='showMoreOptionsBTN'><FaEllipsisVertical /></button> : null}
                        
                        {
                            showOptions ? (<div className="optionsContainer">
                                <ul>
                                    <li><button onClick={deletePostHanlder}>Eliminar</button></li>
                                </ul>
                            </div>) : null
                        }
                    </div>
                </div>
                <div className="postContent" onClick={viewMore}>
                    <p id='postText' dangerouslySetInnerHTML={{ __html: iHTML }}></p>
                    {postImage ? (<img src={postImage} />) : null}
                </div>
                <div className="postStats" onClick={viewMore}>
                    <p>{likes.length} likes</p>
                    <p>{comments} comments</p>
                </div>
                <div className="postFooter" onClick={viewMore}>
                    <button onClick={likeHandler}><FaHeart fill={liked ? 'red' : '#eee'} /></button>
                    <button><FaRegComment /></button>
                </div>
            </div>
        </div>
    )
}

export default Post

/*
<div className="imageFull">
    <button>X</button>
    <img src="no-profile.jpg" alt="" />
</div>
*/