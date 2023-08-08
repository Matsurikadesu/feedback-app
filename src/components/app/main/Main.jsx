import FeedbackList from "./FeedbacksList";
import Header from "./Header";

const Main = ({feedbacks}) => {
    const feedbacksAmount = feedbacks.length;

    return (
        <main className="main">
            <Header amount={feedbacksAmount}/>
            <FeedbackList feedbacks={feedbacks}/>
        </main>
    )
}

export default Main;