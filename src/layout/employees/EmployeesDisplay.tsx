import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchEmployeesListThunk } from '../../redux/slices/employeesSlice';
import { fetchRanksThunk } from '../../redux/slices/ranksSlice';
import Loading from '../../utils/loading/Loading';
import Employee from './employee-component/Employee';
import EmployeeType from '../../types/employeeType';
import './employees.css';

const EmployeesDisplay: React.FC = () => {
  const [ sortType, setSortType ] = useState<string>('');
  const dispatch = useAppDispatch();
  const employees: EmployeeType[] = useAppSelector((state) => state.employeesControl.employees);
  const loadingEmployees: boolean = useAppSelector((state) => state.employeesControl.loading);
  const loadingRanks: boolean = useAppSelector((state) => state.ranksControl.loading);

  useEffect(()=>{
    dispatch(fetchEmployeesListThunk());
    dispatch(fetchRanksThunk());
  },[]);

  if (loadingEmployees || loadingRanks) return ( <Loading/> );

  // applySort checks the current sortType state
  // returning a properly sorted and mapped array of JSX employee elements.
  const applySort = (): JSX.Element => {
    let results = [...employees];

    if (sortType === "alphabetical")
      results = [...employees].sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });

    if (sortType === "rank")
      results = [...employees].sort((a, b) => {
        if (a.rank < b.rank) return -1;
        if (a.rank > b.rank) return 1;
        return 0;
      });

    return (
      <>
        {results.map((employee)=>(
          <Employee key={employee.id} data={employee}/>
        ))}
      </>
    );
  };

  return (
    <>
      <h2 className='title'>Employees</h2>

      <div className='employees__view-controls'>
        <select
          id='employees sort'
          name='employees sort'
          className='employees__sort'
          defaultValue=''
          onChange={(e)=> setSortType(e.target.value)}
        >
          <option disabled={true} value=''>Sort By</option>
          <option value='alphabetical'>Alphabetical</option>
          <option value='rank'>Rank</option>
        </select>
      </div>

      <div className='employee__cards-wrapper'>
        {applySort()}
      </div>
    </>
  );
};

export default EmployeesDisplay;