import { useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { editEmployeeThunk } from "../../../redux/slices/employeesSlice";
import { fetchRanksThunk } from "../../../redux/slices/ranksSlice";
import EmployeeType from "../../../types/employeeType";
import Rank from "../../../types/rankType";
import "../employees.css";

const EditEmployee: React.FC = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLInputElement>(null);  
  const rankRef = useRef<HTMLSelectElement>(null);
  const bdayRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const { paramId } = useParams<string>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const employees: EmployeeType[] = useAppSelector((state)=> state.employeesControl.employees);
  const ranks: Rank[] = useAppSelector((state)=> state.ranksControl.ranks);
  const selectedEmployee: EmployeeType | undefined = employees.find((dude)=> dude.id === Number(paramId));
  
  useEffect(()=>{
    if(ranks.length === 0) dispatch(fetchRanksThunk());
  },[]);

  // Birthday formatting ------------------------------------------------------ >
  let employeeBirthday: Date | null = null;
  let birthdayString: string = "";
  if(selectedEmployee?.birthday) {
    employeeBirthday = new Date(selectedEmployee?.birthday);
    birthdayString = employeeBirthday.toISOString().split('T')[0];
  };
  // --- >

  const submitHandler: Function = (e: React.FormEvent): void => {
    e.preventDefault();
    if(bdayRef.current!.value) {
      const newBirthday = bdayRef.current!.value.split("-");
      employeeBirthday = new Date(`${newBirthday[1]}-${newBirthday[2]}-${newBirthday[0]}`);
    };
    const updatedEmployee: EmployeeType = {
      id: Number(paramId),
      name: nameRef.current!.value,
      rank: Number(rankRef.current!.value),
      birthday: employeeBirthday,
      description: descriptionRef.current!.value,
      status: statusRef.current!.checked,
    };
    dispatch(editEmployeeThunk(updatedEmployee));
    navigate(-1);
    return;
  };

  return (
    <>
      <h2 className="title">Edit {selectedEmployee!.name}</h2>
      <form>
        
        <label>
          Name:
          <input
            type="text"
            id="name"
            name="name"
            ref={nameRef}
            defaultValue={selectedEmployee?.name}/>
        </label>

        <label>
          Rank:
          <select
            id="rank"
            name="rank"
            ref={rankRef}
            defaultValue={selectedEmployee?.rank}>
            {ranks.map(((rank)=>(
              <option key={rank.id} value={rank.rank}>{rank.name}</option>
            )))}
          </select>
        </label>

        <label>
          Birthday:
          <input
            type="date"
            id="birthday"
            name="birthday"
            ref={bdayRef}
            defaultValue={birthdayString}/>
        </label>

        <label>
          Description:
          <textarea
            id="description"
            name="description"
            ref={descriptionRef}
            defaultValue={selectedEmployee?.description}/>
        </label>

        <label>
          Active:
          <input
            type="checkbox"
            ref={statusRef}
            defaultChecked={selectedEmployee?.status}/>
        </label>

        <button className="button" type="submit" onClick={(e)=> submitHandler(e)}>Submit</button>
      </form>
    </>
  );
};

export default EditEmployee;