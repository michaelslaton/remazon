import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../../../redux/hooks';
import Loading from '../../../../components/loading/Loading';
import AwardType from '../../../../../types/award.type';
import EmployeeType from '../../../../../types/employee.type';
import months from '../../../../../data/months';
import '../mostRecent.css';

const MostRecentAward: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();
  const employeesList: EmployeeType[] = useAppSelector((state)=> state.employeesControl.employees);
  let awardsList: AwardType[] = useAppSelector((state) => state.awardsControl.awards);
  awardsList = [...awardsList].filter((award) => award.retired === false && award.holder !== null);
  
  const mostRecentAward: AwardType = awardsList.reduce((prev, current) => {
    const previousDate = new Date(prev.date);
    const currentDate = new Date(current.date);
    return previousDate.getTime() > currentDate.getTime() ? prev : current;
  });
  const awardDate: Date = new Date(mostRecentAward.date);
  const currentHolder: EmployeeType | undefined = employeesList.find((employee)=> employee.id === mostRecentAward.holder);

  if (!awardsList.length) return <><Loading/></>;

  return (
    <div className='most-recent__cel'>
      <div className='most-recent__cel-title'>
        Newest Awarded: 
      </div>
      <div
        data-testid='most recent wrapper'
        className='most-recent__content-wrapper award'
        onClick={()=> navigate('/awards')}
      >
        <h2 className='most-recent__item-title award'>
          {mostRecentAward.name}
        </h2>
        <ul className='most-recent__info-list award'>
          <li>
            Awarded To:
            <div className='most-recent__info-value award'>
              { currentHolder ?
                  <>
                    {` ${currentHolder?.name}`}
                  </>
                :
                  <>
                    {` Unawarded`}
                  </>
              }
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