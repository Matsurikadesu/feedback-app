import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { commentsFetched } from "../feedbacks-list/feedbacksSlice";
import Comment from "../comment/comment";
import './comment.scss';

const CommentsList = ({count}) => {
    const dispatch = useDispatch();
    const comments = useSelector(state => state.comments);
    const feedbackId = window.location.href.split('/')[3];

    const fetchComments = async () => {
            await getDocs(collection(db, 'feedback', feedbackId, 'comments'))
                .then((querySnapshot) => {
                    const newData = querySnapshot.docs.map((doc) => ({...doc.data(), id:doc.id }));
                    dispatch(commentsFetched(newData));
                })
    }

    useEffect(() => {
        fetchComments();

        //eslint-disable-next-line
    }, [])

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

export default CommentsList;