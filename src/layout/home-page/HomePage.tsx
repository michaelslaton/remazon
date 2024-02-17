import CupcakeLeaderboardWidget from './components/cupcake-leaderboard-widget/CupcakeLeaderboardWidget';
import MessageOfTheDay from './components/message-of-the-day/MessageOfTheDay';
import MostRecent from './components/most-recent/MostRecent';
import './homePage.css';

const HomePage: React.FC = () => {

  return (
    <>
      <MessageOfTheDay />
      <MostRecent />
      <div className='popups'>
        <CupcakeLeaderboardWidget/>
      </div>
    </>
  );
};

export default HomePage;