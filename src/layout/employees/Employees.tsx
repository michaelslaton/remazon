import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setEmployees } from "../../redux/slices/employeesSlice";
import { getEmployees } from "../../utils/api/api";
import "./employees.css";

const Employees: React.FC = () => {
  const employees = useAppSelector((state) => state.employeesControl.employees);
  const dispatch = useAppDispatch();

  useEffect(()=>{
    if(employees.length === 0) {
      const data = getEmployees();
      dispatch(setEmployees(data));
    };
  },[employees]);

  return (
    <>
      {employees.map((employee)=>(
        <div key={employee.id}>{employee.name}</div>
      ))}
    </>
  );
};

export default Employees;