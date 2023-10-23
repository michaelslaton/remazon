import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { fetchRanksThunk } from "../../redux/slices/ranksSlice";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserType from "../../types/userType";
// import { NavigateFunction, useNavigate } from "react-router-dom";
import Rank from "./rank-component/Rank";
import RankType from "../../types/rankType";
import "./ranks.css";

const RanksDisplay: React.FC = () => {
  const currentUser: UserType | null = useAppSelector((state)=> state.userControl.currentUser);
  const ranks: RankType[] = useAppSelector((state)=> state.ranksControl.ranks);
  const nonMutRanks = [...ranks];
  const sortedRanks: RankType[] = nonMutRanks.sort((a,b)=> a.id - b.id);
  // const navigate: NavigateFunction = useNavigate();
  const dispatch = useAppDispatch();
  
  useEffect(()=>{
    dispatch(fetchRanksThunk());
  },[]);

  return (
    <>
      <h2 className="title">Ranks</h2>
      { currentUser?.admin &&
        <button className="button" onClick={()=> console.log("bam")}><FontAwesomeIcon icon={faPlus}/></button>
      }
      {sortedRanks.map((rank)=>(
        <Rank key={rank.id} rankData={rank}/>
      ))}
    </>
  );
};

export default RanksDisplay;