import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setEmployees } from "../../redux/slices/employeesSlice";
import { getEmployees } from "../../utils/api/api";
import Employee from "./employee/Employee";
import "./employeesDisplay.css";

const EmployeesDisplay: React.FC = () => {
  const employees = useAppSelector((state) => state.employeesControl.employees);
  const dispatch = useAppDispatch();

  useEffect(()=>{
    if(employees.length === 0) {
      const data = getEmployees();
      dispatch(setEmployees(data));
    };
  },[employees]);

  return (
      <div className="employees-display__wrapper">
        {employees.map((employee)=>(
          <Employee key={employee.id} data={employee}/>
        ))}
      </div>
  );
};

export default EmployeesDisplay;