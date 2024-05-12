import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchEmployeesListThunk } from '../../redux/slices/employeesSlice';
import { fetchRanksThunk } from '../../redux/slices/ranksSlice';
import Employee from './employee-component/Employee';
import EmployeeType from '../../types/employee.type';
import './employees.css';
import RankType from '../../types/rank.type';

const EmployeesDisplay: React.FC = () => {
  const [ sortType, setSortType ] = useState<string>('');
  const [ showDeactivated, setShowDeactivated ] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const employeesList: EmployeeType[] = useAppSelector((state) => state.employeesControl.employees);
  const ranksList: RankType[] = useAppSelector((state)=> state.ranksControl.ranks);

  useEffect(()=>{
    dispatch(fetchEmployeesListThunk());
    dispatch(fetchRanksThunk());
  },[]);

  // applySort checks the current sortType state
  // returning a properly sorted and mapped array of JSX employee elements.
  const applySort = (): JSX.Element => {
    let results: EmployeeType[] = [...employeesList];
    if (sortType === 'alphabetical')
      results = [...employeesList].sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        return 0;
      });
    if (sortType === 'rank')
      results = [...employeesList].sort((a, b) => {
        if (a.rank < b.rank) return -1;
        if (a.rank > b.rank) return 1;
        return 0;
      });
    return (
      <>
        {results.map((employee) =>
          employee.rank !== 0 && (
            <Employee key={employee.id} data={employee} />
        ))}
        {showDeactivated &&
          results.map((employee) =>
            employee.rank === 0 && (
              <Employee key={employee.id} data={employee} />
        ))}
      </>
    );
  };

  if (!employeesList.length || !ranksList.length) {    
    return (
      <>
        <div className='display__header'>
          <h2>Employee Directory</h2>
        </div>

        <div className='display__controls'></div>

        <div className='employee__cards-wrapper'>
          No Employees to display.
        </div>
      </>
    );
  };

  return (
    <>
      <div className='display__header'>
        <h2>Employee Directory</h2>
      </div>

      <div className='display__controls'>
        <select
          id='employees sort'
          name='employees sort'
          defaultValue=''
          onChange={(e)=> setSortType(e.target.value)}
        >
          <option disabled={true} value=''>Sort By</option>
          <option value='alphabetical'>Alphabetical</option>
          <option value='rank'>Rank</option>
        </select>

        <div className='display__controls--deactivated'>
          Show deactivated ? 
          <input
            type='checkbox'
            defaultChecked={false}
            onChange={(e)=> setShowDeactivated(e.target.checked)}
          />
        </div>
      </div>

      <div className='employee__cards-wrapper'>
        {applySort()}
      </div>
    </>
  );
};

export default EmployeesDisplay;