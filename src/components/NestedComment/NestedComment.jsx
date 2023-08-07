import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { feedbackOpened } from "../FeedbacksList/feedbacksSlice";
import { addNewNestedComment, updateFeedback } from "../../firebase/services";

const NestedComment = ({text, replying, id, parentId}) => {
    const dispatch = useDispatch(); 
    const user = useSelector(state => state.user);
    const feedbackId = window.location.href.split('/')[3];
    const feedback = useSelector(state => state.currentFeedback);
    const [reply, setReply] = useState(false);

    const onReply = () => {
        if(reply !== id) {
            setReply(id)
        }else{
            setReply(false);
        }
    }

    const addNestedComment = async (nestedcomment) => {
        setReply(false)
        dispatch(feedbackOpened({feedbackId, feedback: {...feedback, comments: feedback.comments + 1}}))
        addNewNestedComment(feedbackId, parentId, nestedcomment);
        updateFeedback(feedbackId, {comments: feedback.comments + 1})
    }

    const onReplySubmit = (e) => {
        e.preventDefault();
        const newNestedComment = {replyingTo: '1', user: '1', text: e.target.nestedComment.value};
        addNestedComment(newNestedComment);
    }

    return(
        <div className='comment'>
            <div className='comment__header'>
                <div className='comment__info'>
                    <img className='comment__info-avatar' src={user.avatar} alt={`${user.name} avatar`} />
                    <div className='comment__info-container'>
                        <h3 className='comment__info-username'>{user.name}</h3>
                        <small className='comment__info-tag'>@{user.tag}</small>
                    </div>
                </div>
                <button className='comment__reply' onClick={onReply}>Reply</button>
            </div>
            <p className='comment__text'>{replying ? <span className="reply__accent">@{user.tag}</span> : null} {text}</p>
            {reply === id 
                ? 
                <form className="reply-form" onSubmit={onReplySubmit}>
                    <textarea className="reply-form__input form__input" name="nestedComment" id="nestedComment"></textarea>
                    <button type='submit' className="header__btn">Post Reply</button>
                </form> 
                : null}
        </div>
    )
}

export default NestedComment;