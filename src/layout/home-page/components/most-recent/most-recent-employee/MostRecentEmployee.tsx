import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../../../redux/hooks';
import EmployeeType from '../../../../../types/employee.type';
import RankType from '../../../../../types/rank.type';
import Loading from '../../../../../utils/loading/Loading';
import '../mostRecent.css';

const MostRecentEmployee: React.FC = () => {
  const rankList: RankType[] = useAppSelector((state)=> state.ranksControl.ranks);
  const navigate: NavigateFunction = useNavigate();
  let employeeList: EmployeeType[] = useAppSelector((state) => state.employeesControl.employees);
  employeeList = [...employeeList].filter((employee) => employee.rank !== 0);
  const mostRecentEmployee: EmployeeType = [...employeeList].reduce((prev, current) => {
    return prev.id > current.id ? prev : current;
  });
  const employeeRank: RankType | undefined = rankList.find(
    (rank) => rank.id === mostRecentEmployee.rank
  );

  if (!employeeList.length) return <Loading/>;

  return (
    <div className='most-recent__cel'>
      <div className='most-recent__cel-title'>
        New Hire
      </div>
      <div 
        className='most-recent__content-wrapper'
        onClick={()=> navigate('/employees')}
      >
        <div className='most-recent__item-title'>
          {mostRecentEmployee.name}
        </div>
        <ul className='most-recent__info-list'>
          <li>
            Rank:
            <div
              className='most-recent__info-value'
              style={{color: employeeRank?.color}}
            >
                {` ${employeeRank?.name}`}
            </div>
          </li>

          {
            mostRecentEmployee.birthday &&
            <li>
              Birthday:
              <div
                className='most-recent__info-value'
              >
                {` ${mostRecentEmployee.birthday}`}
              </div>
            </li>
          }
          
        </ul>
      </div>
    </div>
  )
};

export default MostRecentEmployee;