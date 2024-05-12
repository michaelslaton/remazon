import { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { createRankThunk, fetchRanksThunk } from '../../../../redux/slices/ranksSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faCheck } from '@fortawesome/free-solid-svg-icons';
import RankType, { RankPostType } from '../../../../types/rank.type';
import { setUiError } from '../../../../redux/slices/controlsSlice';
import '../ranks.css';

type NewRankProps = {
  setNewRankDisplay: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewRank: React.FC<NewRankProps> = ({ setNewRankDisplay }) => {
  const dispatch = useAppDispatch();
  const rankList: RankType[] = useAppSelector((state)=> state.ranksControl.ranks);
  const titleRef = useRef<HTMLInputElement>(null);
  const colorRef = useRef<HTMLInputElement>(null)

  const submitHandler = (e: React.FormEvent): void => {
    e.preventDefault();
    
    if (titleRef.current!.value.length < 1) {
      dispatch(setUiError("Please enter a name for the rank."));
      return;
    };

    const newRank: RankPostType = {
      name: titleRef.current!.value,
      rank: rankList[rankList.length - 1].rank + 1,
      color: colorRef.current!.value,
    };

    dispatch(createRankThunk(newRank))
      .then(()=> dispatch(fetchRanksThunk()))
      .then(()=> setNewRankDisplay(false))
      .catch((error) => {
        dispatch(setUiError(`Error: ${error.code}`));
        console.error(error.code);
        console.error(error.message);
      });

    return;
  };

  return (
    <div className='rank edit'>
      <form className='rank__form'>

        <div className='rank__edit-form--input-section'>
          <label htmlFor='title'>
            Title:
          </label>
          <input
            type='text'
            id='title'
            name='title'
            ref={titleRef}
          />

          <label htmlFor='color'>
            Color:
          </label>
          <input
            type='color'
            id='color'
            name='color'
            data-testid='color-box'
            ref={colorRef}
            className='rank__edit-form--color-selector'
            defaultValue={'#ffa500'}
          />
        </div>
        
        <div className='rank__buttons-wrapper'>
          <button
            type='submit'
            data-testid='submit rank button'
            className='button rank__submit create'
            onClick={(e) => submitHandler(e)}
          >
            <FontAwesomeIcon icon={faCheck} />
          </button>

          <button
            type='button'
            data-testid='cancel new rank'
            className='button rank_submit delete'
            onClick={() => setNewRankDisplay(false)}
          >
            <FontAwesomeIcon icon={faX} />
          </button>
        </div>

      </form>
    </div>
  );
};

export default NewRank;