import { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { EmployeePostType } from "../../../types/employeeType";
import { createEmployeeThunk } from "../../../redux/slices/employeesSlice";
import "./employee.css";

const CreateEmployee: React.FC = () => {
  const dispatch = useAppDispatch();
  const ranks = useAppSelector((state)=> state.ranksControl.ranks);
  const nameRef = useRef<HTMLInputElement>(null);
  const rankRef = useRef<HTMLSelectElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const bdayRef = useRef<HTMLInputElement>(null);

  const submitHandler: Function = (e: React.FormEvent): void => {
    e.preventDefault();
    let employeeBirthday: Date | null = null;
    if(bdayRef.current!.value) employeeBirthday = new Date(bdayRef.current!.value);

    const newEmployee: EmployeePostType = {
      name: nameRef.current!.value,
      rank: Number(rankRef.current!.value),
      birthday: employeeBirthday,
      description: descriptionRef.current!.value,
    };
    dispatch(createEmployeeThunk(newEmployee));
    return;
  };

  return (
    <>
      <h2 className="title">Create Employee</h2>
      <form>
        <label>
          Name:
          <input
            type="text"
            id="name"
            name="name"
            ref={nameRef}/>
        </label>

        <label>
          Rank:
          <select
            id="rank"
            name="rank"
            ref={rankRef}>
            {ranks.map(((rank)=> rank.id !== 1 ? <option key={rank.id} value={rank.rank}>{rank.name}</option> : "" ))}
          </select>
        </label>

          <label>
            Birthday:
            <input
              type="date"
              id="birthday"
              name="birthday"
              ref={bdayRef}/>
          </label>

        <label>
          Description:
          <textarea
            id="description"
            name="description"
            ref={descriptionRef}/>
        </label>
        <button type="submit" onClick={(e)=> submitHandler(e)}>Submit</button>
      </form>
    </>
  );
};

export default CreateEmployee;