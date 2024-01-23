import MessageOfTheDay from './components/message-of-the-day/MessageOfTheDay';
import MostRecent from './components/most-recent/MostRecent';
import './homePage.css';

const HomePage: React.FC = () => {

  return (
    <>
      <MessageOfTheDay />
      <MostRecent />
    </>
  );
};

export default HomePage;