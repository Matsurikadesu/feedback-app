import Comment from "./Comment";
import './comment.scss';
import { useDispatch, useSelector } from "react-redux";
import { commentsFetched } from "../../store/feedbacksSlice";
import { useEffect } from "react";
import { fetchComments } from "../../store/thunks";
import LoadingComponent from "../placeholders/LoadingComponent";

const CommentsList = ({feedbackId, commentsAmount}) => {
    const dispatch = useDispatch();
    const commentsLoadingStatus = useSelector(state => state.commentsLoadingStatus);
    const comments = useSelector(state => state.comments);

    useEffect(() => {
        commentsAmount
            ? dispatch(fetchComments(feedbackId))
            : dispatch(commentsFetched([]));
    }, [commentsAmount, dispatch, feedbackId])

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
        : <LoadingComponent type={'comments'}/>

    return(
        <div className='comments'>
            <b className='title'>{comments.length} Comments</b>
            {commentsList}
        </div>
    )
}

export default CommentsList;