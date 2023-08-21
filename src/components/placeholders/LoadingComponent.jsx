import '../app/main/feedback.scss';
import './feedbacks-loading.scss';

const LoadingComponent = ({type}) => {
    const feedbackLoading = () => <div className='feedback__card feedback__card_placeholder'></div>;
    const commentsLoading = () => <div className="comments comments-placeholder"></div>;

    const selectElement = () => {
        switch(type){
            case 'feedback':
                return feedbackLoading;
            case 'comments':
                return commentsLoading;
            default:
                return <div>Loading...</div>
        }
    }; 
    
    const Element = selectElement();
    
    return (
        <Element/>
    )
}

export default LoadingComponent;