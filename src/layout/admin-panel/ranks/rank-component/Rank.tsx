import { useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { deleteRankThunk, editRankThunk } from '../../../../redux/slices/ranksSlice';
import { setUiError } from '../../../../redux/slices/controlsSlice';
import { faEdit, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faCheck, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RankType from '../../../../types/rank.type';
import EmployeeType from '../../../../types/employee.type';
import '../ranks.css';

type RankProps = {
  rankData: RankType;
};

const Rank: React.FC<RankProps> = ({ rankData }) => {
  const dispatch = useAppDispatch();
  const [editMode, setEditMode] = useState<boolean>(false);
  const employeeList: EmployeeType[] = useAppSelector((state)=> state.employeesControl.employees);
  const titleRef = useRef<HTMLInputElement>(null);
  const colorRef = useRef<HTMLInputElement>(null);

  const editSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (titleRef.current!.value.length < 1) {
      dispatch(setUiError("Please enter a name for the rank."));
      return;
    };
    const updatedRank: RankType = {
      id: rankData!.id,
      name: titleRef.current!.value,
      rank: rankData!.rank,
      color: colorRef.current!.value,
    };
    dispatch(editRankThunk(updatedRank))
    .catch((error) => {
      dispatch(setUiError(`Error: ${error.code}`));
      console.error(error.code);
      console.error(error.message);
    });
    setEditMode(false);
    return;
  };

  const deleteButtonHandler = (): void => {
    const employeesAssignedRank = employeeList.filter((employee)=> employee.rank === rankData.id);
    if (employeesAssignedRank.length) dispatch(setUiError(`Please reassign all employees currently assigned to the rank of ${rankData.name} before attempting to delete.`));
    else if (window.confirm(`Are you sure you want to delete the rank ${rankData.name} ?`)) dispatch(deleteRankThunk(rankData.id));
    return;
  };

  // Render Edit Mode ------------------------------------------------->
  if (editMode) return (
    <div className='rank edit'>
      <form className='rank__form'>

        <div className='rank__edit-form--input-section'>
          <label htmlFor='title'>
            Title :
          </label>
          <input
            type='text'
            id='title'
            name='title'
            ref={titleRef}
            className='rank__edit-form--input'
            defaultValue={rankData!.name}
          />

          <label htmlFor='color'>
            Color :
          </label>
          <input
            type='color'
            id='color'
            name='color'
            ref={colorRef}
            className='rank__edit-form--color-selector'
            defaultValue={rankData!.color}
          />
        </div>

        <div className='rank__buttons-wrapper'>
          <button
            type='submit'
            data-testid='rank-save-button'
            className='button rank__submit'
            onClick={(e) => editSubmit(e)}
          >
            <FontAwesomeIcon icon={faCheck} />
          </button>

          <button
            type='button'
            data-testid='rank-cancel-button'
            className='button delete'
            onClick={() => setEditMode(false)}
          >
            <FontAwesomeIcon icon={faX} />
          </button>
        </div>

      </form>
    </div>
  );
  
  // Render Display Mode ------------------------------------------------->
  return (
    <div className='rank'>
      <h2
        className='rank__title'
        style={{ color: rankData.color }}
      >
        {rankData!.name}
      </h2>
      
      <div className='rank__buttons-wrapper'>
        <button
          data-testid='rank-edit-button'
          className='button rank__submit'
          onClick={() => setEditMode(true)}
        >
          <FontAwesomeIcon icon={faEdit} />
        </button>

        {/* Conditional : Can't delete the Ceo or Deactivated rank*/}
        { rankData.id > 1 &&
          <button
            data-testid='rank-delete-button'
            className='button delete'
            onClick={() => deleteButtonHandler()}
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        }
      </div>
    </div>
  );
};

export default Rank;