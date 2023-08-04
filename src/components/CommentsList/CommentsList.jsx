import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useEffect, useState} from "react";
import { useDispatch,  } from "react-redux";
import { userFetched } from "../FeedbacksList/feedbacksSlice";
import CommentsLoading from "../LoadingPlaceholders/CommentsLoading";
import Comment from "../Comment/Comment";
import './comment.scss';

const CommentsList = ({count}) => {
    const dispatch = useDispatch();
    const feedbackId = window.location.href.split('/')[3];
    const [comments, setComments] = useState(false)

    const fetchComments = async () => {
        await getDocs(collection(db, 'feedback', feedbackId, 'comments'))
            .then((querySnapshot) => {
                const newData = querySnapshot.docs.map((doc) => ({...doc.data(), id:doc.id }));
                setComments(newData);
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
    }, [count])

    const commentsList = comments
        ? comments.map((item, index) => (
            <Comment
                key={index}
                id={item.id}
                text={item.text}
                />
        ))
        : null;

    if(!comments){
        return(
            <CommentsLoading/>
        )
    }else{
        return(
            <div className='comments'>
                <b className='title'>{count} Comments</b>
                {commentsList}
            </div>
        )
    }
}

export default CommentsList;