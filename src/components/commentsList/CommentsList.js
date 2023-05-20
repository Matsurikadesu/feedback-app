import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { commentsFetched, userFetched } from "../feedbacks-list/feedbacksSlice";
import CommentsLoading from "../loading-placeholders/CommentsLoading";
import Comment from "../comment/comment";
import './comment.scss';

const CommentsList = ({count}) => {
    const dispatch = useDispatch();
    const comments = useSelector(state => state.comments);
    const feedbackId = window.location.href.split('/')[3];
    const loadingStatus = useSelector(state => state.feedbackPageLoadingStatus)

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
        fetchUser();

        //eslint-disable-next-line
    }, [])

    const commentsList = comments 
        ? comments.map((item, index) => (
            <Comment
                key={index}
                id={item.id}
                text={item.text}
                />
        ))
        : null;

    if(loadingStatus === 'loading'){
        return(
            <CommentsLoading/>
        )
    }else if (loadingStatus === 'idle'){
        return(
            <div className='comments'>
                <b className='title'>{count} Comments</b>
                {commentsList}
            </div>
        )
    }
}

export default CommentsList;