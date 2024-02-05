import { useAppSelector } from '../../redux/hooks';
import AwardType from '../../types/awardType';
import Award from './award-component/Award';
import './awards.css';

const AwardsDisplay: React.FC = () => {
  const awardsList: AwardType[] = useAppSelector((state)=> state.awardsControl.awards);

  return (
    <>
      <div className='display__header'>
        <h2>Awards</h2>
      </div>
      
      <div className='display__controls'>
        <div>
          Mike work on this
        </div>
      </div>
      
      <div className='award__cards-wrapper'>
        {awardsList.map((award)=> (
          <Award awardData={award}/>
        ))}
      </div>
    </>
  );
};

export default AwardsDisplay;