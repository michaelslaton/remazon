import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { fetchRanksThunk } from "../../redux/slices/ranksSlice";
import Rank from "./rank/Rank";
import RankType from "../../types/rankType";
import "./ranks.css";

const RanksDisplay: React.FC = () => {
  const ranks: RankType[] = useAppSelector((state)=> state.ranksControl.ranks);
  const dispatch = useAppDispatch();

  useEffect(()=>{
    if(ranks.length === 0) dispatch(fetchRanksThunk());
  },[]);

  return (
    <>
      <h2 className="title">Ranks</h2>
      {ranks.sort((a,b)=> a.id - b.id).map((rank)=>(
        <Rank key={rank.id} rankData={rank}/>
      ))}
    </>
  );
};

export default RanksDisplay;