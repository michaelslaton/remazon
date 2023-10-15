import { useEffect } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchEmployeesThunk } from "../../redux/slices/employeesSlice";
import { fetchRanksThunk } from "../../redux/slices/ranksSlice";
import Employee from "./employee/Employee";
import "./employeesDisplay.css";

const EmployeesDisplay: React.FC = () => {
  const employees = useAppSelector((state) => state.employeesControl.employees);
  const ranks = useAppSelector((state)=> state.ranksControl.ranks);
  const loading = useAppSelector((state) => state.employeesControl.loading);
  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();

  useEffect(()=>{
    dispatch(fetchEmployeesThunk());
    if(ranks.length === 0) dispatch(fetchRanksThunk());
  },[]);

  return (
      <div className="employees-display__wrapper">
        { loading ? <p>Loading...</p>
        :
        <>
          <button className="button" onClick={()=> navigate("/employees/create")}> Create</button>
          {employees.map((employee)=>(
            <Employee key={employee.id} data={employee}/>
          ))}
        </>
        }
      </div>
  );
};

export default EmployeesDisplay;