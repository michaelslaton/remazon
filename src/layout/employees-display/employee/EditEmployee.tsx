import { useRef } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { editEmployee } from "../../../redux/slices/employeesSlice";
import EmployeeType from "../../../types/employeeType";
import "./employee.css";

const EditEmployee: React.FC = () => {
  const { id } = useParams();
  const nameRef = useRef<HTMLInputElement>(null);
  const rankRef = useRef<HTMLSelectElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const statusRef = useRef<HTMLInputElement>(null);
  
  const dispatch = useAppDispatch();
  const employees = useAppSelector((state)=> state.employeesControl.employees)
  const selectedEmployee = employees.find((dude)=> dude.id === Number(id));
  

  const submitHandler: Function = (e: React.FormEvent): void => {
    e.preventDefault();

    const updatedEmployee: EmployeeType = {
      id: Number(id),
      name: nameRef.current!.value,
      rank: Number(rankRef.current!.value),
      birthday: null,
      description: descriptionRef.current!.value,
      status: statusRef.current!.checked,
    }

    dispatch(editEmployee(updatedEmployee));

    return
  };

  return (
    <>
      <form>
        <label>
          Name:
          <input type="text" ref={nameRef} defaultValue={selectedEmployee?.name}/>
        </label>

        <label>
          Rank:
          <select id="rank" name="rank" ref={rankRef} defaultValue={selectedEmployee?.rank}>
            <option value="3">wrong</option>
            <option value="1">Right!</option>
            <option value="2">wrong</option>
          </select>
        </label>

        <label>
          Description:
          <textarea id="description" name="description" ref={descriptionRef} defaultValue={selectedEmployee?.description}/>
        </label>

        <label>
          Active:
          <input type="checkbox" defaultChecked={selectedEmployee?.status} ref={statusRef}/>
        </label>
        <button type="submit" onClick={(e)=> submitHandler(e)}>Submit</button>
      </form>
    </>
  );
};

export default EditEmployee;