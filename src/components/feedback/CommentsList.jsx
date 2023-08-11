import CommentsLoading from "../placeholders/CommentsLoading";
import Comment from "./Comment";
import './comment.scss';
import { useComments } from "../../firebase/services";
import { useSelector } from "react-redux";

const CommentsList = ({feedbackId}) => {
    const commentsLoadingStatus = useSelector(state => state.commentsLoadingStatus);
    const comments = useSelector(state => state.comments);
    useComments(feedbackId);

    const commentsList = commentsLoadingStatus === 'idle' && comments
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