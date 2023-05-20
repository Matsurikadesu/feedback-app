import { addDoc, collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { userFetched } from "../feedbacks-list/feedbacksSlice";
import NestedComment from "../nested-comment/NestedComment";

const Comment = ({text, isparent, id, replying}) => {
    const dispatch = useDispatch()
    const feedbackId = window.location.href.split('/')[3];
    const feedback = useSelector(state => state.currentFeedback)
    const user = useSelector(state => state.user);
    const [isReply, setIsReply] = useState(false);
    const [nestedComments, setNested] = useState(false);
    
    const fetchUser = async () => {
        await getDoc(doc(db, 'users', '1'))
            .then((querySnapshot) => {
                const user = querySnapshot.data();
                dispatch(userFetched(user));
            })
    }

    useEffect(() => {
        fetchUser();
        //eslint-disable-next-line
    }, [])

    const fetchNestedComments = async () => {
        await getDocs(collection(db, 'feedback', feedbackId, 'comments', id, 'nestedcomments'))
            .then((querySnapshot) => {
                const nestedComments = querySnapshot.docs.map(((doc) => ({...doc.data(), id:doc.id })))
                setNested(nestedComments);
            })
    }
    
    const addNestedComment = async (nestedcomment) => {
        await addDoc(collection(db, 'feedback', feedbackId, 'comments', id, 'nestedcomments'), nestedcomment);
        await updateDoc(doc(db, 'feedback', feedbackId, 'comments', id), {isparent: true});
        await updateDoc(doc(db, 'feedback', feedbackId), {comments: feedback.comments + 1});
    }

    const onReply = () => {
        if(isReply !== id) {
            setIsReply(id)
        }else{
            setIsReply(false);
        }
    }

    const onReplySubmit = (e) => {
        e.preventDefault();
        const newNestedComment = {replyingTo: '1', user: '1', text: e.target.nestedComment.value};
        addNestedComment(newNestedComment);
    }

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
            <p className='comment__text'>{replying ? `@${user.tag} ` : null}{text}</p>
            {isReply === id 
                ? 
                <form className="reply-form" onSubmit={onReplySubmit}>
                    <textarea className="reply-form__input form__input" name="nestedComment" id="nestedComment"></textarea>
                    <button type='submit' className="header__btn">Post Reply</button>
                </form> 
                : null}
            {isparent 
                ? 
                <div className="comments__tree">
                    {nestedComments 
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
                    }
                </div>
                :null
            }
        </div>
    )
}

export default Comment;
