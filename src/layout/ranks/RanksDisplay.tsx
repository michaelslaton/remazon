import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { fetchRanksThunk } from '../../redux/slices/ranksSlice';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NewRank from './rank-component/NewRank';
import EmployeeType from '../../types/employeeType';
import Rank from './rank-component/Rank';
import RankType from '../../types/rankType';
import './ranks.css';

const RanksDisplay: React.FC = () => {
  const [ newRankDisplay, setNewRankDisplay ] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const currentEmployee: EmployeeType | null = useAppSelector((state)=> state.employeesControl.currentEmployee);
  const ranks: RankType[] = useAppSelector((state)=> state.ranksControl.ranks);
  const nonMutRanks = [...ranks];
  const sortedRanks: RankType[] = nonMutRanks.sort((a,b)=> a.id - b.id);
  
  useEffect(()=>{
    dispatch(fetchRanksThunk());
  },[]);

  return (
    <div className='center-display-space'>
      <div className='form-wrapper ranks-wrapper'>
        <h2 className='title'>Ranks</h2>
        {sortedRanks.map((rank)=>(
          <Rank key={rank.id} rankData={rank}/>
        ))}
        { currentEmployee?.admin &&
          <>
            { newRankDisplay ? 
              <NewRank setNewRankDisplay={setNewRankDisplay}/>
              :
              <button className='button card-button' onClick={()=> setNewRankDisplay(true)}>
                <FontAwesomeIcon icon={faPlus}/>
              </button>
            }
          </>
        }
      </div>
    </div>
  );
};

export default RanksDisplay;