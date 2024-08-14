import formatText from '../utils/formatText'
import './styles/comment.scss'
const Comment = ({ pic, comment, username }) => {


    return (
        <div className="commentContainer">
            <div className="profile">
                <img src={pic == '' ? 'http://localhost/no-profile.jpg' : pic} />
                <p>{username}</p>
            </div>
            <p className='commentText' dangerouslySetInnerHTML={{ __html: formatText(comment) }}></p>
        </div>
    )
}

export default Comment