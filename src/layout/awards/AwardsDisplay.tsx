import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import AwardType from '../../types/award.type';
import Award from './award-component/Award';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './awards.css';
import { fetchAwardsThunk } from '../../redux/slices/awardsSlice';
import EmployeeType from '../../types/employee.type';

const AwardsDisplay: React.FC = () => {
  const [ sortType, setSortType ] = useState<string>('');
  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();
  const currentEmployee: EmployeeType | null = useAppSelector((state)=> state.employeesControl.currentEmployee);
  let awardsList: AwardType[] = useAppSelector((state)=> state.awardsControl.awards);

  useEffect(()=>{
    dispatch(fetchAwardsThunk);
  },[])

  if (sortType === 'alphabetical'){
    awardsList = [...awardsList].sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
      if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
      return 0;
  })};

  if (sortType === 'alphabeticalR'){
    awardsList = [...awardsList].sort((a, b) => {
      if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
      if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
      return 0;
  })};

  if (sortType === 'date'){
    awardsList = [...awardsList].sort((a, b) => {
      const aDate = new Date(a.date);
      const bDate = new Date(b.date);
      if (aDate.getTime() > bDate.getTime()) return -1;
      if (aDate.getTime() < bDate.getTime()) return 1;
      return 0;
  })};

  if (sortType === 'dateR'){
    awardsList = [...awardsList].sort((a, b) => {
      const aDate = new Date(a.date);
      const bDate = new Date(b.date);
      if (aDate.getTime() < bDate.getTime()) return -1;
      if (aDate.getTime() > bDate.getTime()) return 1;
      return 0;
  })};

  if (sortType === 'belt'){
    awardsList = [...awardsList].sort((a, b) => {
      if (a.type < b.type) return -1;
      if (a.type > b.type) return 1;
      return 0;
  })};

  if (sortType === 'award'){
    awardsList = [...awardsList].sort((a, b) => {
      if (a.type > b.type) return -1;
      if (a.type < b.type) return 1;
      return 0;
  })};

  if(!awardsList.length) return ( <>No awards to display</> );

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
          <option value='alphabeticalR'>
            Alphabetical {'(R)'}
          </option>
          <option value='date'>
            Award Date
          </option>
          <option value='dateR'>
            Award Date {'(R)'}
          </option>
          <option value='belt'>
            belt
          </option>
          <option value='award'>
            award
          </option>
        </select>

        {currentEmployee?.uid && 
          currentEmployee.rank < 5 &&
          <button
            className='button card-button'
            onClick={()=> navigate('/awards/create')}
          >
            <FontAwesomeIcon icon={faPlus}/>
          </button>
        }
      </div>
      
      <div data-testid='award cards wrapper' className='award__cards-wrapper'>
        {awardsList.map((award)=> (
          <Award key={award.id} awardData={award}/>
        ))}
      </div>
    </>
  );
};

export default AwardsDisplay;