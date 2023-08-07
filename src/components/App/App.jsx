import Main from '../Main/Main';
import Aside from '../Aside/Aside';
import { useFeedbacks } from '../../firebase/services';

function App() {
  const { feedbacks } = useFeedbacks();

  return (
        <div className='content'>
          <Aside feedbacks={feedbacks}/>
          <Main feedbacks={feedbacks}/>
        </div>
    );
}

export default App;
