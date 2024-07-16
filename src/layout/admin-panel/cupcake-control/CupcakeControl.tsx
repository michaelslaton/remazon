import { useAppSelector } from '../../../redux/hooks';
import EmployeeType from '../../../types/employee.type';
import './cupcakeControl.css';
import CupcakeEmployee from './CupcakeEmployee';

const CupcakeControl: React.FC = () => {
  const employeesList: EmployeeType[] = useAppSelector((state)=> state.employeesControl.employees);

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