import { addDoc, collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { commentsFetched, userFetched } from "../feedbacks-list/feedbacksSlice";
import './comment.scss';

const Comments = ({count}) => {
    const dispatch = useDispatch();
    const comments = useSelector(state => state.comments);
    const user = useSelector(state => state.user);
    const [nestedComments, setNested] = useState(false);
    const feedbackId = window.location.href.split('/')[3];
    const [isReply, setIsReply] = useState(false);
    const feedback = useSelector(state => state.currentFeedback)

    const fetchComments = async () => {
            await getDocs(collection(db, 'feedback', feedbackId, 'comments'))
                .then((querySnapshot) => {
                    const newData = querySnapshot.docs.map((doc) => ({...doc.data(), id:doc.id }));
                    dispatch(commentsFetched(newData));
                })
    }

    const fetchUser = async () => {
        await getDoc(doc(db, 'users', '1'))
            .then((querySnapshot) => {
                const user = querySnapshot.data();
                dispatch(userFetched(user));
            })
    }

    useEffect(() => {
        fetchComments();
        if (!user) fetchUser();
        //eslint-disable-next-line
    }, [])

    const Comment = ({text, isparent, id, replying}) => {
        const fetchNestedComments = async () => {
            await getDocs(collection(db, 'feedback', feedbackId, 'comments', id, 'nestedcomments'))
                .then((querySnapshot) => {
                    const nestedComments = querySnapshot.docs.map(((doc) => ({...doc.data(), id:doc.id })))
                    setNested(nestedComments);
                })
        }
        
        const addNestedComment = async (nestedcomment) => {
            await addDoc(collection(db, 'feedback', feedbackId, 'comments', id, 'nestedcomments'), nestedcomment);
            await updateDoc(doc(db, 'feedback', feedbackId), {comments: feedback.comments + 1});
            await updateDoc(doc(db, 'feedback', feedbackId, 'comments', id), {isparent: true});
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

        if(isparent && !nestedComments) fetchNestedComments();

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
                                <Comment 
                                    key={index} 
                                    text={item.text} 
                                    isparent={false} 
                                    id={item.id}
                                    replying={item.replyingTo}/>
                            ))
                            : null}
                    </div>
                    :null
                }
            </div>
        )
    }

    const commentsList = comments 
        ? comments.map((item, index) => (
            <Comment
                key={index}
                id={item.id}
                isparent={item.isparent}
                text={item.text}
                />
        ))
        : null;

    return(
        <div className='comments'>
            <b className='title'>{count} Comments</b>
            {commentsList}
        </div>
    )
}

export default Comments;