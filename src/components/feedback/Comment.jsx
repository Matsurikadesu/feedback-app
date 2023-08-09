import { addDoc, collection, getDocs} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import NestedComment from "./NestedComment";
import { useParams } from "react-router-dom";

const Comment = ({text, id}) => {
    const {feedbackId} = useParams();
    const user = useSelector(state => state.user);
    const [reply, setReply] = useState(false);
    const [nestedComments, setNested] = useState(false);

    const fetchNestedComments = async () => {
        await getDocs(collection(db, 'feedback', feedbackId, 'comments', id, 'nestedcomments'))
            .then((querySnapshot) => {
                const nestedComments = querySnapshot.docs.map(((doc) => ({...doc.data(), id:doc.id })))
                setNested(nestedComments);
            })
    }
    
    const addNestedComment = async (nestedcomment) => {
        setReply(false);
        await addDoc(collection(db, 'feedback', feedbackId, 'comments', id, 'nestedcomments'), nestedcomment);
        fetchNestedComments();
    }

    const onReply = () => {
        if(reply !== id) {
            setReply(id)
        }else{
            setReply(false);
        }
    }

    const onReplySubmit = (e) => {
        e.preventDefault();
        const newNestedComment = {replyingTo: '1', user: '1', text: e.target.nestedComment.value};
        addNestedComment(newNestedComment);
    }

    const nestedCommentsList = nestedComments 
        ? nestedComments.map((item, index) => (
            <NestedComment
                key={index}
                text={item.text}
                replying={item.replyingTo}
                id={item.id}
                parentId={id}
                />
        ))
        :null

    useEffect(() => {
        fetchNestedComments();
        //eslint-disable-next-line
    }, [])

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
            <p className='comment__text'>{text}</p>
            {reply === id 
                ? 
                <form className="reply-form" onSubmit={onReplySubmit}>
                    <textarea className="reply-form__input form__input" name="nestedComment" id="nestedComment"></textarea>
                    <button type='submit' className="header__btn">Post Reply</button>
                </form> 
                : null}
    
                {nestedCommentsList !== null && nestedCommentsList.length > 0 &&
                    <div className="comments__tree">
                        {nestedCommentsList}
                    </div>
                }
        </div>
    )
}

export default Comment;
