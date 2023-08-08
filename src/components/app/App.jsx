import Main from './main/Main';
import Aside from './aside/Aside';
import { useFeedbacks } from '../../firebase/services';

function App() {
  const { feedbacks } = useFeedbacks();

  return (
        <div className='content'>
          <Aside/>
          <Main feedbacks={feedbacks}/>
        </div>
    );
}

export default App;
