import FeedbackList from "./FeedbacksList";
import Header from "./Header";

const Main = ({feedbacks}) => {
    return (
        <main className="main">
            <Header/>
            <FeedbackList feedbacks={feedbacks}/>
        </main>
    )
}

export default Main;