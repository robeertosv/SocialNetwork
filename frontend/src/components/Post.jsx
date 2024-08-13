import { useEffect, useState } from 'react';
import './styles/post.scss'

const Post = ({ username, profilePIC, isVerified, postText, postImage, likes, comments }) => {
    const [iHTML, setIHTML] = useState()

    function format(text) {
        return (text.replace(/#(\w+)/g, '<a href="/tags/$1">#$1</a>').replace(/@(\w+)/g, '<a href="/$1">@$1</a>'))
    }

    useEffect(() => {
        setIHTML(format(postText))
    }, [])

    return (
        <div className="post">
            <div className='postContainer'>
                <div className="postHeader">
                    {profilePIC !='' && profilePIC != 'no-profile.jpg' && profilePIC != null ? (<img src={profilePIC} id='accountPic' />) : <img src='no-profile.jpg' id='accountPic' />}
                    <div className="nameContainer">
                        <a href='roberto'>{username}</a>
                        {isVerified ? (<img src="verified.png" alt="" />) : null}
                    </div>
                </div>
                <div className="postContent">
                    <p id='postText' dangerouslySetInnerHTML={{ __html: iHTML }}></p>
                    {postImage ? (<img src={postImage} />) : null}
                </div>
                <div className="postStats">
                    <p>{likes} likes</p>
                    <p>{comments} comments</p>
                </div>
                <div className="postFooter">
                    <button>LIKE</button>
                    <button>COMM</button>
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