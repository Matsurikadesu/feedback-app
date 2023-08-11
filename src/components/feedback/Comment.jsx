import { useState } from "react";
import NestedComment from "./NestedComment";
import NestedCommentForm from "./NestedCommentForm";

const Comment = ({text, id, nestedComments, userInfo, feedbackId}) => {
    const [reply, setReply] = useState(false);

    const handleOpenReplyFormClick = () => {
        reply !== id 
            ? setReply(id)
            : setReply(false);
    }

    const nestedCommentsList = nestedComments 
        && nestedComments.map(comment => (
            <NestedComment 
                {...comment} 
                key={comment.id}
                userInfo={comment.user}
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
                reply === id 
                    && <NestedCommentForm 
                            id={id}
                            userInfo={userInfo}
                            setReply={setReply}/> 
            }
    
            { 
                nestedCommentsList.length !== 0 &&
                    <div className="comments__tree">
                        {nestedCommentsList}
                    </div>
            }
        </div>
    )
}

export default Comment;
