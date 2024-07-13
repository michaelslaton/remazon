import { useAppSelector } from '../../../redux/hooks';
import EmployeeType from '../../../types/employee.type';
import './cupcakeControl.css';

const CupcakeControl: React.FC = () => {
  const employeesList: EmployeeType[] = useAppSelector((state)=> state.employeesControl.employees);

  return (
    <div className='admin-widget'>
      <h2 className='admin-widget__title'>Cupcake Control</h2>
      <div>
        {employeesList.map((employee)=>(
          <div className='cupcake__listing'>
            <div className=''>{employee.name}</div>
            <div>{employee.cupcakes}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CupcakeControl;