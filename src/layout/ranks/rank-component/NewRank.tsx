import { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { createRankThunk, fetchRanksThunk } from '../../../redux/slices/ranksSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faCheck } from '@fortawesome/free-solid-svg-icons';
import { RankPostType } from '../../../types/rankType';
import '../ranks.css';

type NewRankProps = {
  setNewRankDisplay: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewRank: React.FC<NewRankProps> = ({ setNewRankDisplay }) => {
  const dispatch = useAppDispatch();
  const rankList = useAppSelector((state)=> state.ranksControl.ranks);
  const titleRef = useRef<HTMLInputElement>(null);
  const colorRef = useRef<HTMLInputElement>(null)

  const submitHandler = (e: React.FormEvent): void => {
    e.preventDefault();
    const newRank: RankPostType = {
      name: titleRef.current!.value,
      rank: rankList[rankList.length - 1].rank + 1,
      color: colorRef.current!.value,
    };

    dispatch(createRankThunk(newRank))
    .then(()=> dispatch(fetchRanksThunk()))
    .then(()=> setNewRankDisplay(false));
    return;
  };

  return (
    <div className='rank edit'>
      <form className='rank__form'>

      <label htmlFor='title'>
        Title:
        <input
          type='text'
          id='title'
          name='title'
          ref={titleRef}
        />
      </label>

      <label htmlFor='color'>
        Color:
        <input
          type='color'
          id='color'
          name='color'
          ref={colorRef}
          className='rank-color-selector'
          defaultValue={'#ffa500'}
        />
      </label>
      <div>
        <button type='submit' className='button rank__submit create' onClick={(e)=> submitHandler(e)}>
          <FontAwesomeIcon icon={faCheck}/>
        </button>

        <button className='button rank_submit delete' onClick={()=> setNewRankDisplay(false)}>
          <FontAwesomeIcon icon={faX}/>
        </button>
      </div>

      </form>
    </div>
  );
};

export default NewRank;