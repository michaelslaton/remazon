import { useAppSelector } from "../../../../redux/hooks";
import EmployeeType from "../../../../types/employeeType";
import Employee from "../../../employees/employee-component/Employee";
import "./mostRecentEmployee.css";

const MostRecentEmployee: React.FC = () => {
  const employeeList: EmployeeType[] = useAppSelector((state)=> state.employeesControl.employees);
  const mostRecentEmployee: EmployeeType = employeeList.reduce((prev, current)=> { return prev.id > current.id ? prev : current });


  if(!employeeList.length) return <></>;

  return (
    <div>
      <div className="most-recent-cel-title">
        Most Recent Employee
      </div>
      <div>
        <Employee data={mostRecentEmployee}/>
      </div>
    </div>
  )
};

export default MostRecentEmployee;