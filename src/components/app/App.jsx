import Main from './main/Main';
import Aside from './aside/Aside';
import { useFeedbacks } from '../../firebase/services';
import { useSelector } from 'react-redux';

function App() {
  const filter = useSelector(state => state.filter);
  const sortingMethod = useSelector(state => state.sortingMethod);

  const { feedbacks } = useFeedbacks(filter, sortingMethod);

  return (
        <div className='content'>
          <Aside/>
          <Main feedbacks={feedbacks}/>
        </div>
    );
}

export default App;
