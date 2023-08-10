import { useSelector } from "react-redux";
import { useState } from "react";
import NestedComment from "./NestedComment";
import { useUser } from "../../firebase/services";
import { handleReplySubmit } from "./handleReplySubmit";

const Comment = ({text, id, nestedComments, userId, feedbackId}) => {
    const user = useSelector(state => state.user);
    const [reply, setReply] = useState(false);
    const { userInfo } = useUser(userId);

    const handleOpenReplyFormClick = () => {
        reply !== id 
            ? setReply(id)
            : setReply(false);
    }

    const NestedForm = () => {
        return(
            <form className="reply-form" onSubmit={(e) => handleReplySubmit(e, user, userInfo, id, feedbackId)}>
                <textarea className="reply-form__input form__input" name="nestedComment" id="nestedComment"></textarea>
                <button type='submit' className="header__btn">Post Reply</button>
            </form> 
        )
    }

    const nestedCommentsList = nestedComments 
        && nestedComments.map(comment => (
            <NestedComment 
                {...comment} 
                key={comment.id}
                userId={comment.user}
                feedbackId={feedbackId}/>
        ));

    return(
        <div className='comment'>
            <div className='comment__header'>
                <div className='comment__info'>
                    <img className='comment__info-avatar' src={userInfo.avatar} alt={`${userInfo.name} avatar`} />
                    <div className='comment__info-container'>
                        <h3 className='comment__info-username'>{userInfo.name}</h3>
                        <small className='comment__info-tag'>@{userInfo.tag}</small>
                    </div>
                </div>
                <button type="button" className='comment__reply' onClick={handleOpenReplyFormClick}>Reply</button>
            </div>
            <p className='comment__text'>{text}</p>
            {
                reply === id && <NestedForm/> 
            }
    
            { 
                nestedCommentsList &&
                    <div className="comments__tree">
                        {nestedCommentsList}
                    </div>
            }
        </div>
    )
}

export default Comment;
