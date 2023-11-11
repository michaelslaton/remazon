import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchEmployeesListThunk } from "../../redux/slices/employeesSlice";
import { fetchRanksThunk } from "../../redux/slices/ranksSlice";
import Employee from "./employee-component/Employee";
import EmployeeType from "../../types/employeeType";
import RankType from "../../types/rankType";
import "./employees.css";

const EmployeesDisplay: React.FC = () => {
  const dispatch = useAppDispatch();
  const employees: EmployeeType[] = useAppSelector((state) => state.employeesControl.employees);
  const loadingEmployees: boolean = useAppSelector((state) => state.employeesControl.loading);
  const loadingRanks: boolean = useAppSelector((state) => state.ranksControl.loading);
  const ranks: RankType[] = useAppSelector((state)=> state.ranksControl.ranks);

  useEffect(()=>{
    dispatch(fetchEmployeesListThunk());
    if (ranks.length < 1) dispatch(fetchRanksThunk());
  },[]);

  if (loadingEmployees || loadingRanks) return <p>Loading...</p>;

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