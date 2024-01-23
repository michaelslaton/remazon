import { useAppSelector } from '../../../../../redux/hooks';
import EmployeeType from '../../../../../types/employeeType';
import RankType from '../../../../../types/rankType';
import '../mostRecent.css';

const MostRecentEmployee: React.FC = () => {
  const rankList = useAppSelector((state)=> state.ranksControl.ranks);
  const employeeList: EmployeeType[] = useAppSelector((state) =>
    state.employeesControl.employees.filter((employee) => employee.rank !== 0)
  );
  const mostRecentEmployee: EmployeeType = employeeList.reduce((prev, current) => {
      return prev.id > current.id ? prev : current;
    }
  );
  const employeeRank: RankType | undefined = rankList.find(
    (rank) => rank.id === mostRecentEmployee.rank
  );

  if(!employeeList.length) return <></>;

  return (
    <div className='most-recent__cel'>
      <div className='most-recent__cel-title'>
        New Hire
      </div>
      <div className='most-recent__content-wrapper'>
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
          <li>
            Birthday:
            <div
              className='most-recent__info-value'
            >
              {mostRecentEmployee.birthday ?
                <>
                  {` ${mostRecentEmployee.birthday}`}
                </>
                :
                <>
                  {` N/a`}
                </>
              }
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
};

export default MostRecentEmployee;