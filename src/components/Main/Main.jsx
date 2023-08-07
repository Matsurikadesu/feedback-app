import FeedbackList from "../FeedbacksList/FeedbacksList";
import Header from "../Header/Header";

const Main = ({feedbacks}) => {
    const feedbacksAmount = feedbacks.length;

    return (
        <main className="main">
            <Header amount={feedbacksAmount}/>
            <FeedbackList/>
        </main>
    )
}

export default Main;