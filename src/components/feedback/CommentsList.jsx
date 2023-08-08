import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useEffect, useState} from "react";
import CommentsLoading from "../placeholders/CommentsLoading";
import Comment from "./Comment";
import './comment.scss';

const CommentsList = ({count, feedbackId}) => {
    const [comments, setComments] = useState(false)

    const fetchComments = async () => {
        await getDocs(collection(db, 'feedback', feedbackId, 'comments'))
            .then((querySnapshot) => {
                const newData = querySnapshot.docs.map((doc) => ({...doc.data(), id:doc.id }));
                setComments(newData);
            })
    }

    useEffect(() => {
        fetchComments();
        //eslint-disable-next-line
    }, [count])

    const commentsList = comments && comments.map((item, index) => (
            <Comment
                key={index}
                id={item.id}
                text={item.text}
                />
        ))

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