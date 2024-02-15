import CupcakeLeaderboard from './components/cupcake-leaderboard/CupcakeLeaderboard';
import MessageOfTheDay from './components/message-of-the-day/MessageOfTheDay';
import MostRecent from './components/most-recent/MostRecent';
import './homePage.css';

const HomePage: React.FC = () => {

  return (
    <>
      <MessageOfTheDay />
      <MostRecent />
      <div className='popups'>
        <CupcakeLeaderboard rows={3}/>
      </div>
    </>
  );
};

export default HomePage;