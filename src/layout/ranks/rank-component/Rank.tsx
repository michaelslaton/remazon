import { useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { deleteRankThunk, editRankThunk } from "../../../redux/slices/ranksSlice";
import { setUiError } from "../../../redux/slices/controlsSlice";
import { faEdit, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RankType from "../../../types/rankType";
import "../ranks.css";
import EmployeeType from "../../../types/employeeType";

type RankProps = {
  rankData: RankType;
};

const Rank: React.FC<RankProps> = ({ rankData }) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const employeeList: EmployeeType[] = useAppSelector((state)=> state.employeesControl.employees);
  const dispatch = useAppDispatch();
  const titleRef = useRef<HTMLInputElement>(null);
  const colorRef = useRef<HTMLInputElement>(null)

  const editSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    const updatedRank: RankType = {
      id: rankData!.id,
      name: titleRef.current!.value,
      rank: rankData!.rank,
      color: colorRef.current!.value,
    };

    dispatch(editRankThunk(updatedRank));
    setEditMode(false);
    return;
  };

  const deleteButtonHandler = (): void => {
    const employeesAssignedRank = employeeList.filter((employee)=> employee.rank === rankData.id);
    if(employeesAssignedRank.length) dispatch(setUiError(`Please reassign all employees currently assigned to the rank of ${rankData.name} before attempting to delete.`));
    else dispatch(deleteRankThunk(rankData.id));
  };

  // Render Edit Mode ------------------------------------------------->
  if (editMode) return (
    <div className="rank edit">
      <form className="rank__form">

      <label htmlFor="title">
        Title:
        <input
          type="text"
          id="title"
          name="title"
          ref={titleRef}
          defaultValue={rankData!.name}
        />
      </label>

      <label htmlFor="color">
        Color:
        <input
          type="color"
          id="color"
          name="color"
          ref={colorRef}
          className="rank-color-selector"
          defaultValue={rankData!.color}
        />
      </label>

      <button type="submit" className="button rank__submit" onClick={(e)=> editSubmit(e)}>
        <FontAwesomeIcon icon={faEdit}/>
      </button>

      </form>
    </div>
  );
  
  // Render Display Mode ------------------------------------------------->
  return (
    <div className="rank">
      <h2 className="rank__title" style={{color: rankData.color}}>{rankData!.name}</h2>
      <div className="rank__buttons-wrapper">
        <button className="button rank__submit" onClick={()=> setEditMode(true)}>
          <FontAwesomeIcon icon={faEdit}/>
        </button>
        
        {/* Conditional : Can't delete the Ceo rank*/}
        { rankData.id !== 1 && 
          <button className="button delete" onClick={()=> deleteButtonHandler()}>
            <FontAwesomeIcon icon={faTrashCan}/>
          </button>
        }
      </div>
    </div>
  );
};

export default Rank;