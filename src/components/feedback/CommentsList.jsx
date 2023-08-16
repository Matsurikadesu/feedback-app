import CommentsLoading from "../placeholders/CommentsLoading";
import Comment from "./Comment";
import './comment.scss';
import { fetchComments } from "../../firebase/services";
import { useDispatch, useSelector } from "react-redux";
import { commentsFetched, commentsFetching } from "../../store/feedbacksSlice";
import { useEffect } from "react";

const CommentsList = ({feedbackId, commentsAmount}) => {
    const commentsLoadingStatus = useSelector(state => state.commentsLoadingStatus);
    const comments = useSelector(state => state.comments);

    const dispatch = useDispatch();

    const getComments = async () => {
        const newComments = await fetchComments(feedbackId, comments);
        dispatch(commentsFetched(newComments));
    }
    
    useEffect(() => {
        if(commentsAmount){
            dispatch(commentsFetching());
            getComments();
        }else{
            dispatch(commentsFetched([]));
        }
        //eslint-disable-next-line
    }, [])

    const commentsList = commentsLoadingStatus === 'idle'
        ? comments
            .filter(comment => comment.parentComment === false)
            .map(comment => (
                <Comment
                    nestedComments={comments.filter(item => item.parentComment === comment.id)}
                    key={comment.id}
                    {...comment}
                    userInfo={comment.user}
                    feedbackId={feedbackId}/>
            ))
        : <CommentsLoading/>

    return(
        <div className='comments'>
            <b className='title'>{comments.length} Comments</b>
            {commentsList}
        </div>
    )
}

export default CommentsList;