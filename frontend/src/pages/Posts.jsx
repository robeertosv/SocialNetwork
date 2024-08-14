import '../styles/posts.scss'
import LeftSideMenu from '../components/LeftSideMenu'
import Post from '../components/Post'
import Comment from '../components/Comment'
import { useEffect, useState } from 'react'
import { checkPost } from '../utils/fetchers'

const Posts = () => {

    const postID = window.location.pathname.split('/posts/')[1]
    const [post, setPost] = useState({})

    useEffect(() => {
        // 1º Comprobar si el post existe
        async function cPost() {
            let res = await checkPost(postID);

            if (res.code == 404 || res.code == 500) { return window.location.replace('../404') }

            setPost(res)
        } cPost()
    }, [])

    

    return (
        <div className="postsContainer">
            <LeftSideMenu username={'roberto'} />
            <div className="content">
                <div className="post">
                
                    {
                       post != {} ? <Post id={postID} username={post.username} profilePIC={post.pic} isVerified={post.isVerified} postText={post.postText} postImage={post.image} likes={post.likes} comments={post.comments}/> : null
                    }
                </div>
                <div className="comments">
                    <h1>Comments</h1>
                    <ul>
                        <li><Comment username={'roberto'} pic={''} comment={'PUES ME #CAGO EN TODO'} /></li>
                        <li><Comment username={'roberto'} pic={''} comment={'PUES ME #CAGO EN TODO'} /></li>
                        <li><Comment username={'roberto'} pic={''} comment={'PUES ME #CAGO EN TODO'} /></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Posts