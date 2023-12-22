import MessageOfTheDay from './components/message-of-the-day/MessageOfTheDay';
import MostRecentEmployee from './components/most-recent-employee/MostRecentEmployee';
import MostRecentProject from './components/most-recent-project/MostRecentProject';
import Divider from '../../utils/divider/Divider';
import './homePage.css';

const HomePage: React.FC = () => {

  return (
    <>
      <MessageOfTheDay />
      <div className='most-recent-container'>
        <div className='most-recent-wrapper'>
          <MostRecentEmployee/>
          <div className='most-recent-divider'>
            <Divider vertical={true}/>
          </div>
          <MostRecentProject/>
        </div>
      </div>
    </>
  );
};

export default HomePage;