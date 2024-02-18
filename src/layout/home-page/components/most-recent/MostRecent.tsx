import MostRecentEmployee from './most-recent-employee/MostRecentEmployee';
import MostRecentProject from './most-recent-project/MostRecentProject';
import './mostRecent.css';

const MostRecent: React.FC = () => {
  return (
    <div className='most-recent__wrapper'>
      <MostRecentEmployee />
      <MostRecentProject />
      <MostRecentEmployee />
    </div>
  );
};

export default MostRecent;