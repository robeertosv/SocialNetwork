import formatText from '../utils/formatText'
import './styles/comment.scss'
const Comment = ({ pic, isVerified, comment, username }) => {


    return (
        <div className="commentContainer">
            <div className="profile">
                <img src={pic == '' ? 'http://localhost/no-profile.jpg' : pic} />
                <div>
                <p>{username}</p>{isVerified ? <img src='http://localhost/verified.png' alt="" /> : null}
                </div>
            </div>
            <p className='commentText' dangerouslySetInnerHTML={{ __html: formatText(comment) }}></p>
        </div>
    )
}

export default Comment