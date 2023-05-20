import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../../firebase";

const NestedComment = ({text, replying, id, parentId}) => {
    const user = useSelector(state => state.user);
    const [isReply, setIsReply] = useState(false);
    const feedbackId = window.location.href.split('/')[3];
    const feedback = useSelector(state => state.currentFeedback);

    const onReply = () => {
        if(isReply !== id) {
            setIsReply(id)
        }else{
            setIsReply(false);
        }
    }

    const addNestedComment = async (nestedcomment) => {
        await addDoc(collection(db, 'feedback', feedbackId, 'comments', parentId, 'nestedcomments'), nestedcomment);
        await updateDoc(doc(db, 'feedback', feedbackId), {comments: feedback.comments + 1});
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
            <p className='comment__text'>{replying ? `@${user.tag} ` : null}{text}</p>
            {isReply === id 
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