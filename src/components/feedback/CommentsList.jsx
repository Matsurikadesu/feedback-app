import CommentsLoading from "../placeholders/CommentsLoading";
import Comment from "./Comment";
import './comment.scss';
import { useComments } from "../../firebase/services";
import { useSelector } from "react-redux";

const CommentsList = ({count, feedbackId}) => {
    const commentsLoadingStatus = useSelector(state => state.commentsLoadingStatus);
    const { comments } = useComments(feedbackId);

    const commentsList = commentsLoadingStatus === 'idle' && comments
        ? comments
            .filter(comment => comment.parentComment === false)
            .map(comment => (
                <Comment
                    key={comment.id}
                    nestedComments={comments.filter(item => item.parentComment === comment.id)}
                    {...comment}
                    userId={comment.user}/>
            ))
        : <CommentsLoading/>

    return(
        <div className='comments'>
            <b className='title'>{count} Comments</b>
            {commentsList}
        </div>
    )
}

export default CommentsList;