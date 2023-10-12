import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchEmployees } from "../../redux/slices/employeesSlice";
import Employee from "./employee/Employee";
import "./employeesDisplay.css";

const EmployeesDisplay: React.FC = () => {
  const employees = useAppSelector((state) => state.employeesControl.employees);
  const loading = useAppSelector((state) => state.employeesControl.loading);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    dispatch(fetchEmployees());
  },[]);

  return (
      <div className="employees-display__wrapper">
        { loading ? <p>Loading...</p>
        :
        <>
          <button onClick={()=> navigate("/employees/create")}> Create</button>
          {employees.map((employee)=>(
            <Employee key={employee.id} data={employee}/>
          ))}
        </>
        }
      </div>
  );
};

export default EmployeesDisplay;