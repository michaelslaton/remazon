import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { fetchRanksThunk } from '../../../redux/slices/ranksSlice';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NewRank from './rank-component/NewRank';
import EmployeeType from '../../../types/employee.type';
import Rank from './rank-component/Rank';
import RankType from '../../../types/rank.type';
import './ranks.css';
import Loading from '../../components/loading/Loading';

const AdminRanks: React.FC = () => {
  const dispatch = useAppDispatch();
  const [ newRankDisplay, setNewRankDisplay ] = useState<boolean>(false);
  const currentEmployee: EmployeeType | null = useAppSelector((state)=> state.employeesControl.currentEmployee);
  const ranksList: RankType[] = useAppSelector((state)=> state.ranksControl.ranks);
  
  useEffect(()=>{
    dispatch(fetchRanksThunk());
  },[]);

  if (!ranksList.length) return ( <Loading/> );

  return (
    <div className='form-wrapper ranks-wrapper'>
      <h2 className='title form-title'>Rank List</h2>
      <div className='ranks-list'>
        {[...ranksList].sort((a,b)=> a.id - b.id).map((rank)=> rank.id !== 0 ?
          <Rank key={rank.id} rankData={rank}/>
          :
          ''
        )}
        <div className='form__control-wrapper'>
          { currentEmployee?.admin &&
            <>
              { newRankDisplay ? 
                <NewRank setNewRankDisplay={setNewRankDisplay}/>
                :
                <button data-testid='add rank' className='button form__control' onClick={()=> setNewRankDisplay(true)}>
                  <FontAwesomeIcon icon={faPlus}/>
                </button>
              }
            </>
          }
        </div>
      </div>
    </div>
  );
};

export default AdminRanks;