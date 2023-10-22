import { useEffect } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchEmployeesThunk } from "../../redux/slices/employeesSlice";
import { fetchRanksThunk } from "../../redux/slices/ranksSlice";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Employee from "./employee/Employee";
import EmployeeType from "../../types/employeeType";
import "./employees.css";

const EmployeesDisplay: React.FC = () => {
  const employees: EmployeeType[] = useAppSelector((state) => state.employeesControl.employees);
  const loading1: boolean = useAppSelector((state) => state.employeesControl.loading);
  const ranks = useAppSelector((state)=> state.ranksControl.ranks);
  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();

  useEffect(()=>{
    dispatch(fetchEmployeesThunk());
    if (ranks.length === 0) dispatch(fetchRanksThunk());
  },[]);

  if (loading1 || ranks.length === 0) return (
    <p>Loading...</p>
  )
  console.log(1)

  return (
      <div className="employees-display__wrapper">
        <>
          <button className="button" onClick={()=> navigate("/employees/create")}><FontAwesomeIcon icon={faPlus}/></button>
          {employees.map((employee)=>(
            <Employee key={employee.id} data={employee}/>
          ))}
        </>
      </div>
  );
};

export default EmployeesDisplay;