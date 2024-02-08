import { useRef } from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { setUiError, updateMotdThunk } from '../../../redux/slices/controlsSlice';
import './adminMotd.css';

const AdminMotd: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();
  const currentMotd: string = useAppSelector((state)=> state.mainControl.motd);
  const motdRef = useRef<HTMLTextAreaElement>(null);

  const submitHandler: Function = (e: React.FormEvent): void => {
    e.preventDefault();

    if (motdRef.current!.value === currentMotd) {
      dispatch(setUiError('No changes have been made.'));
      return;
    };

    dispatch(updateMotdThunk({
      motd: motdRef.current!.value
    }));

    navigate('/');
    return;
  };

  return (
    <form className='form-wrapper'>
      <div className='form__section'>
        <h2 className='title form-title'>Message of the Day</h2>
      </div>
      
      <label
        htmlFor='description'
        className='form-input-label'
      >
        Message:
      </label>
      <textarea
        id='description'
        name='description'
        ref={motdRef}  // onChange={(e)=> setCountData(e.currentTarget.value.length)}
        defaultValue={currentMotd}
      />

      <button
        className='button form__control'
        type='submit'
        onClick={(e)=> submitHandler(e)}
      >
        Save
      </button>
    </form>
  );
};

export default AdminMotd;