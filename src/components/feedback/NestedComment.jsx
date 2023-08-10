import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useUser } from "../../firebase/services";
import { handleReplySubmit } from "./handleReplySubmit";

const NestedComment = ({text, userId, id, parentComment}) => {
    const user = useSelector(state => state.user);
    const [reply, setReply] = useState(false);
    const {feedbackId} = useParams();

    const { userInfo } = useUser(userId);

    const handleOpenReplyFormClick = () => {
        reply !== id
            ? setReply(id)
            : setReply(false);
    }

    const textToShow = useMemo(() => {
        const textArray = text.split(' ');
        const tag = textArray.shift();
        let content = '';

        textArray.length > 1 
            ? content = textArray.join(' ')
            : content = textArray[0];

        return {
            tag,
            content
        }
    }, [text])

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
                <button className='comment__reply' onClick={handleOpenReplyFormClick}>Reply</button>
            </div>
            
            <p className='comment__text'>
                <span className="reply__accent">
                    {textToShow.tag}
                </span> 
                {' ' + textToShow.content}
            </p>
            
            {
                reply === id && 
                    <form className="reply-form" onSubmit={(e) => handleReplySubmit(e, user, userInfo, parentComment, feedbackId)}>
                        <textarea
                            className="reply-form__input form__input" 
                            name="nestedComment" 
                            id="nestedComment"/>
                        <button type='submit' className="header__btn">Post Reply</button>
                    </form> 
            }
        </div>
    )
}

export default NestedComment;