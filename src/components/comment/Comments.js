import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { commentsFetched, userFetched } from "../feedbacks-list/feedbacksSlice";

const Comments = ({count}) => {
    const dispatch = useDispatch();
    const comments = useSelector(state => state.comments);
    const user = useSelector(state => state.user);
    const [nestedComments, setNested] = useState(false);

    const fetchComments = async () => {
        const feedbackId = window.location.href.split('/')[3];
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
        const feedbackId = window.location.href.split('/')[3];

        const fetchNestedComments = async () => {
            await getDocs(collection(db, 'feedback', feedbackId, 'comments', id, 'nestedcomments'))
                .then((querySnapshot) => {
                    const nestedComments = querySnapshot.docs.map(((doc) => ({...doc.data(), id:doc.id })))
                    setNested(nestedComments);
                })
        }

        if(!nestedComments) fetchNestedComments();

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
                    <button className='comment__reply'>Reply</button>
                </div>
                <p className='comment__text'>{replying ? `${user.tag} ` : null}{text}</p>
                {isparent 
                    ? 

                    <div className="comments__tree">
                        {nestedComments ? nestedComments.map((item, inde) => (<Comment key={inde} text={item.text} isparent={false} id={item.id} replying={item.replyingTo}/>)): null}
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