import { useState, useRef } from "react";
import { useAppDispatch } from "../../../redux/hooks";
import { editRankThunk } from "../../../redux/slices/ranksSlice";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RankType from "../../../types/rankType";
import "../ranks.css";

type RankProps = {
  rankData: RankType;
};

const Rank: React.FC<RankProps> = ({ rankData }) => {
  const [editMode, setEditMode] = useState<boolean>(false);
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
      <button className="button rank__submit" onClick={()=> setEditMode(true)}>
        <FontAwesomeIcon icon={faEdit}/>
      </button>
    </div>
  );
};

export default Rank;