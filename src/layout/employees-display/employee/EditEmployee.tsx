import { useRef } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import EmployeeType from "../../../types/employeeType";
import { editEmployee } from "../../../redux/slices/employeesSlice";
import "./employee.css";

const EditEmployee: React.FC = () => {
  const { id } = useParams();
  const employees = useAppSelector((state)=> state.employeesControl.employees)
  const dispatch = useAppDispatch();
  const nameRef = useRef<HTMLInputElement>(null);
  const rankRef = useRef<HTMLSelectElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const statusRef = useRef<HTMLInputElement>(null);

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

    console.log(updatedEmployee)

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