import { useAppSelector } from '../../../redux/hooks';
import CupcakeEmployee from './CupcakeEmployee';
import EmployeeType from '../../../types/employee.type';
import './cupcakeControl.css';

const CupcakeControl: React.FC = () => {
  let employeesList: EmployeeType[] = useAppSelector((state)=> state.employeesControl.employees);
  employeesList = [...employeesList].filter((employee)=> employee.rank !== 1);

  return (
    <div className='admin-widget'>
      <h2 className='admin-widget__title'>Cupcake Control</h2>
      <div>
        {employeesList.map((employee)=>(
            <CupcakeEmployee data={employee}/>
        ))}
      </div>
    </div>
  );
};

export default CupcakeControl;