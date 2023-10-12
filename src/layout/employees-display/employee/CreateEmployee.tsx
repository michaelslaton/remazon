import { useRef } from "react";
import { useAppDispatch } from "../../../redux/hooks";
import { EmployeePostType } from "../../../types/employeeType";
import { createEmployee } from "../../../redux/slices/employeesSlice";
import "./employee.css";

const CreateEmployee: React.FC = () => {
  const dispatch = useAppDispatch();
  const nameRef = useRef<HTMLInputElement>(null);
  const rankRef = useRef<HTMLSelectElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const submitHandler: Function = (e: React.FormEvent): void => {
    e.preventDefault();
    const newEmployee: EmployeePostType = {
      name: nameRef.current!.value,
      rank: Number(rankRef.current!.value),
      description: descriptionRef.current!.value,
    };
    dispatch(createEmployee(newEmployee));
    return
  };

  return (
    <>
      <form>
        <label>
          Name:
          <input type="text" ref={nameRef}/>
        </label>

        <label>
          Rank:
          <select id="rank" name="rank" ref={rankRef}>
            <option value="4">Eh ??</option>
          </select>
        </label>

        <label>
          Description:
          <textarea id="description" name="description" ref={descriptionRef}/>
        </label>
        <button type="submit" onClick={(e)=> submitHandler(e)}>Submit</button>
      </form>
    </>
  );
};

export default CreateEmployee;