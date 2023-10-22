import { useState, useRef } from "react";
import { useAppDispatch } from "../../../redux/hooks";
import { editRankThunk } from "../../../redux/slices/ranksSlice";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RankType from "../../../types/rankType";
import "../ranks.css";

type RankProps = {
  rankData: RankType;
}

const Rank: React.FC<RankProps> = ({ rankData }) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const editSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    const updatedRank: RankType = {
      id: rankData!.id,
      name: titleRef.current!.value,
      rank: rankData!.rank,
      description: descriptionRef.current!.value,
    }

    dispatch(editRankThunk(updatedRank));
    setEditMode(false);
    return
  }

  if (editMode) return (
    <div className="rank">
      <form>
      <label>
        Title:
        <input
          type="text"
          id="title"
          name="title"
          ref={titleRef}
          defaultValue={rankData!.name}
        />
      </label>
      <label>
        Description:
        <textarea
          id="description"
          name="description"
          ref={descriptionRef}
          defaultValue={rankData!.description}
        />
      </label>
      <button type="submit" className="button" onClick={(e)=> editSubmit(e)}><FontAwesomeIcon icon={faEdit}/></button>
      </form>
    </div>
  );

  return (
    <div className="rank">
      <h2 className="rank__title">{rankData!.name}</h2>
      <div>{rankData!.description}</div>
      <button className="button" onClick={()=> setEditMode(true)}><FontAwesomeIcon icon={faEdit}/></button>
    </div>
  );
};

export default Rank;