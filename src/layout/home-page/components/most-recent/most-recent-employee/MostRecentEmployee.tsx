import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../../../redux/hooks';
import EmployeeType from '../../../../../types/employee.type';
import RankType from '../../../../../types/rank.type';
import '../mostRecent.css';

const MostRecentEmployee: React.FC = () => {
  const rankList: RankType[] = useAppSelector((state)=> state.ranksControl.ranks);
  const navigate: NavigateFunction = useNavigate();
  const employeeList: EmployeeType[] = useAppSelector((state) => state.employeesControl.employees);
  let mostRecentEmployee: EmployeeType | null = null;

  if(employeeList.length){ 
    mostRecentEmployee = [...employeeList]
    .filter((employee) => employee.rank !== 0)
    .reduce((prev, current) => { return prev.id > current.id ? prev : current });
  }

  const employeeRank: RankType | undefined = rankList.find((rank) => rank.id === mostRecentEmployee?.rank);
  const aliasList: string[] = [''];
  if(mostRecentEmployee?.aliases) mostRecentEmployee?.aliases.split(',');

  if (!employeeList.length) return <></>;

  return (
    <div className='most-recent__cel'>
      <div className='most-recent__cel-title'>
        New Hire
      </div>
      <div
        data-testid='most recent employee wrapper'
        className='most-recent__content-wrapper'
        onClick={()=> navigate('/employees')}
      >
        <h2 className='most-recent__item-title'>
          {mostRecentEmployee?.name}
        </h2>
        <ul className='most-recent__info-list'>
          <li>
            {`Rank: `}
            <div
              className='most-recent__info-value'
              style={{color: employeeRank?.color}}
            >
                {`${employeeRank?.name}`}
            </div>
          </li>

          {
            mostRecentEmployee?.birthday &&
            <li>
              {`Birthday: `}
              <div className='most-recent__info-value'>
                {`${mostRecentEmployee.birthday}`}
              </div>
            </li>
          }

          { aliasList[0] !== '' &&
            <li>
              {`Aliases: `}
              <div className='most-recent__info-value'>
                { aliasList.map((alias, i)=> i < aliasList.length - 1 ? `${alias}, ` : `${alias}`)}
              </div>
            </li>
          }
          
        </ul>
      </div>
    </div>
  )
};

export default MostRecentEmployee;