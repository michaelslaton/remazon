import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import AwardType from '../../types/awardType';
import Award from './award-component/Award';
import './awards.css';
import { fetchAwardsThunk } from '../../redux/slices/awardsSlice';

const AwardsDisplay: React.FC = () => {
  const [ sortType, setSortType ] = useState<string>('');
  const dispatch = useAppDispatch();
  let awardsList: AwardType[] = useAppSelector((state)=> state.awardsControl.awards);

  useEffect(()=>{
    dispatch(fetchAwardsThunk);
  },[])

  if (sortType === 'alphabetical')
  awardsList = [...awardsList].sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
    return 0;
  });

  if (sortType === 'type')
  awardsList = [...awardsList].sort((a, b) => {
    if (a.type < b.type) return -1;
    if (a.type > b.type) return 1;
    return 0;
  });

  return (
    <>
      <div className='display__header'>
        <h2>Awards</h2>
      </div>
      
      <div className='display__controls'>
        <select
          id='awards sort'
          name='awards sort'
          defaultValue=''
          onChange={(e)=> setSortType(e.target.value)}
        >
          <option
            disabled={true}
            value=''
          >
              Sort By
          </option>
          <option value='alphabetical'>
            Alphabetical
          </option>
          <option value='type'>
            Type
          </option>
        </select>
      </div>
      
      <div className='award__cards-wrapper'>
        {awardsList.map((award)=> (
          <Award awardData={award}/>
        ))}
      </div>
    </>
  );
};

export default AwardsDisplay;