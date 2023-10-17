import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { fetchRanksThunk } from "../../redux/slices/ranksSlice";
import "./ranks.css";
import Rank from "../../types/rankType";

const Ranks: React.FC = () => {
  const ranks: Rank[] = useAppSelector((state)=> state.ranksControl.ranks);
  const dispatch = useAppDispatch();

  useEffect(()=>{
    if(ranks.length === 0) dispatch(fetchRanksThunk());
  },[]);

  return (
    <>
      <h2 className="title">Ranks</h2>
      {ranks.map((rank)=>(
        <div key={rank.id}>
          {rank.name}
        </div>
      ))}
    </>
  );
};

export default Ranks;