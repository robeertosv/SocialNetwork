import '../styles/posts.scss'
import LeftSideMenu from '../components/LeftSideMenu'
import Post from '../components/Post'
import Comment from '../components/Comment'
import CreateComment from '../components/CreateComment'
import { useEffect, useState } from 'react'
import { checkPost } from '../utils/fetchers'

const Posts = () => {

    const postID = window.location.pathname.split('/posts/')[1]
    const [post, setPost] = useState({})
    const [userData, setUserData] = useState({})

    useEffect(() => {
        // 1º Comprobar si el post existe
        async function cPost() {
            let res = await checkPost(postID);

            if (res.code == 404 || res.code == 500) { return window.location.replace('../404') }

            setPost(res)

        } cPost()

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

            if (!res.username) { return window.location.replace('/login') }

            setUserData(res)
        } getUserByToken()
    
    }, [])




return (
    <div className="postsContainer">
        <LeftSideMenu username={'roberto'} />
        <div className="content">
            <div className="post">
                
                {
                    post.username && userData.username  ? <Post id={postID} ownerID={post.ownerId}
                        viewerID={userData._id} username={post.username} profilePIC={post.pic} isVerified={post.isVerified} postText={post.postText} postImage={post.image} likes={post.likes} comments={post.comments.length} /> : null
                }
            </div>
            <div className="comments">
                <h1>Comments</h1>
                <CreateComment postID={postID} />
                <ul>
                    {

                        post.username ? post.comments.reverse().map((item, idx) => {
                            return (<li key={idx}><Comment username={item.user.username} isVerified={item.user.isVerified} pic={item.user.pic} comment={item.comment} /></li>)
                        }) : null

                    }
                </ul>
            </div>
        </div>
    </div>
)
}

export default Posts