import './styles/createComment.scss'

const CreateComment = ({postID}) => {

    const handler = async (e) => {
        e.preventDefault()

        let headers= new Headers()
        headers.append('Content-Type', 'application/json')

        let comment = document.querySelector('#comment').value
        
        let body = {post: postID, comment}
        body = JSON.stringify(body)
        
        console.log(body)
        
        let res = await fetch('http://localhost/api/posts/comment', {headers, body, credentials: 'include', method:'POST'})
        res = await res.json()
        
        window.location.reload()

    }
    return (
        <div className='createCommentContainer'>
            <form onSubmit={handler}>
                <input type="text" id='comment' placeholder='Introduce tu comentario' name='comment' required />
                <button type="submit">Comentar</button>
            </form>
        </div>
    )
}

export default CreateComment