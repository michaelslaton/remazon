import MostRecentEmployee from './most-recent-employee/MostRecentEmployee';
import MostRecentProject from './most-recent-project/MostRecentProject';
import MostRecentAward from './most-recent-award/MostRecentAward';
import './mostRecent.css';

const MostRecent: React.FC = () => {
  return (
    <div className='most-recent__wrapper'>
      <MostRecentEmployee />
      <MostRecentAward />
      <MostRecentProject />
    </div>
  );
};

export default MostRecent;