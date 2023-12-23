import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchEmployeesListThunk } from '../../redux/slices/employeesSlice';
import { fetchRanksThunk } from '../../redux/slices/ranksSlice';
import Loading from '../../utils/loading/Loading';
import Employee from './employee-component/Employee';
import EmployeeType from '../../types/employeeType';
import './employees.css';

const EmployeesDisplay: React.FC = () => {
  const dispatch = useAppDispatch();
  const employees: EmployeeType[] = useAppSelector((state) => state.employeesControl.employees);
  const loadingEmployees: boolean = useAppSelector((state) => state.employeesControl.loading);
  const loadingRanks: boolean = useAppSelector((state) => state.ranksControl.loading);

  useEffect(()=>{
    dispatch(fetchEmployeesListThunk());
    dispatch(fetchRanksThunk());
  },[]);

  if (loadingEmployees || loadingRanks) return ( <Loading/> );

  return (
      <>
        <h2 className='title'>Employees</h2>
        <div className='employee__cards-wrapper'>
          {employees.map((employee)=>(
            <Employee key={employee.id} data={employee}/>
          ))}
        </div>
      </>
  );
};

export default EmployeesDisplay;