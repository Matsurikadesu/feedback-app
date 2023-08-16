import { useMemo, useState } from "react";
import NestedCommentForm from "./NestedCommentForm";
import { usePreload } from "../../hooks/usePreload";

const NestedComment = ({text, userInfo, id, parentComment}) => {
    const [reply, setReply] = useState(false);
    const avatar = usePreload(userInfo.avatar, '/icons/avatar-placeholder.svg');

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
                    <img className='comment__info-avatar' src={avatar} alt={`${userInfo.name} avatar`} />
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
                reply === id 
                && <NestedCommentForm
                        id={parentComment}
                        userInfo={userInfo}
                        setReply={setReply}/>
            }
        </div>
    )
}

export default NestedComment;