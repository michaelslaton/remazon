import { useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { editEmployeeThunk } from "../../../redux/slices/employeesSlice";
import { fetchRanksThunk } from "../../../redux/slices/ranksSlice";
import EmployeeType from "../../../types/employeeType";
import "./employee.css";

const EditEmployee: React.FC = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLInputElement>(null);  
  const rankRef = useRef<HTMLSelectElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const { paramId } = useParams();
  const dispatch = useAppDispatch();
  const employees = useAppSelector((state)=> state.employeesControl.employees);
  const ranks = useAppSelector((state)=> state.ranksControl.ranks);
  const selectedEmployee = employees.find((dude)=> dude.id === Number(paramId));

  useEffect(()=>{
    if(ranks.length === 0) dispatch(fetchRanksThunk());
  },[])
  

  const submitHandler: Function = (e: React.FormEvent): void => {
    e.preventDefault();
    const updatedEmployee: EmployeeType = {
      id: Number(paramId),
      name: nameRef.current!.value,
      rank: Number(rankRef.current!.value),
      birthday: null,
      description: descriptionRef.current!.value,
      status: statusRef.current!.checked,
    };
    dispatch(editEmployeeThunk(updatedEmployee));
    return;
  };

  return (
    <>
      <h2 className="title">Edit {selectedEmployee!.name}</h2>
      <form>
        <label>
          Name:
          <input type="text" ref={nameRef} defaultValue={selectedEmployee?.name}/>
        </label>

        <label>
          Rank:
          <select id="rank" name="rank" ref={rankRef} defaultValue={selectedEmployee?.rank}>
            {ranks.map(((rank)=>(
              <option key={rank.id} value={rank.rank}>{rank.name}</option>
            )))}
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
        <button className="button" type="submit" onClick={(e)=> submitHandler(e)}>Submit</button>
      </form>
    </>
  );
};

export default EditEmployee;