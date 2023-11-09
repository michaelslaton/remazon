import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchEmployeesListThunk } from "../../redux/slices/employeesSlice";
import { fetchRanksThunk } from "../../redux/slices/ranksSlice";
import Employee from "./employee-component/Employee";
import EmployeeType from "../../types/employeeType";
import "./employees.css";

const EmployeesDisplay: React.FC = () => {
  const employees: EmployeeType[] = useAppSelector((state) => state.employeesControl.employees);
  const loading1: boolean = useAppSelector((state) => state.employeesControl.loading);
  const ranks = useAppSelector((state)=> state.ranksControl.ranks);
  const dispatch = useAppDispatch();

  useEffect(()=>{
    dispatch(fetchEmployeesListThunk());
    if (ranks.length === 0) dispatch(fetchRanksThunk());
  },[]);

  if (loading1 || ranks.length < 1) return (
    <p>Loading...</p>
  );

  return (
      <div className="employees-display__wrapper">
        <h2 className="title">Employees</h2>
        {employees.map((employee)=>(
          <Employee key={employee.id} data={employee}/>
        ))}
      </div>
  );
};

export default EmployeesDisplay;