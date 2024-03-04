import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../../../redux/hooks';
import months from '../../../../../data/months';
import '../mostRecent.css';
import AwardType from '../../../../../types/awardType';

const MostRecentAward: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();
  let awardsList: AwardType[] = useAppSelector((state) => state.awardsControl.awards);
  awardsList = [...awardsList].filter((project) => project.retired === false);
  
  const mostRecentAward: AwardType = awardsList.reduce((prev, current) => {
    const previousDate = new Date(prev.date);
    const currentDate = new Date(current.date);
    return previousDate.getTime() > currentDate.getTime() ? prev : current;
  });
  const awardDate: Date = new Date(mostRecentAward.date);

  if (!awardsList.length) return <></>;

  return (
    <div className='most-recent__cel'>
      <div className='most-recent__cel-title'>
        Newest Awarded: 
      </div>
      <div
        className='most-recent__content-wrapper award'
        onClick={()=> navigate('/awards')}
      >
        <div className='most-recent__item-title award'>
          {mostRecentAward.name}
        </div>
        <ul className='most-recent__info-list award'>
          <li>
            Awarded To:
            <div className='most-recent__info-value award'>
              {` ${mostRecentAward.holder}`}
            </div>
          </li>
          <li>
            Type:
            <div className='most-recent__info-value award'>
              {` ${mostRecentAward.type}`}
            </div>
          </li>
          <li>
            Date:
            <div className='most-recent__info-value award'>
              {` ${months[awardDate.getMonth()]} ${awardDate.getDate()}, ${awardDate.getFullYear()}`}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MostRecentAward;