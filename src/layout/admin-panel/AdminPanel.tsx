import { useRef } from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setUiError, updateMotdThunk } from '../../redux/slices/controlsSlice';
import './adminPanel.css';

const AdminPanel: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();
  const currentMotd: string = useAppSelector((state)=> state.mainControl.motd);
  const motdRef = useRef<HTMLTextAreaElement>(null);

  const submitHandler: Function = (e: React.FormEvent): void => {
    e.preventDefault();

    if(motdRef.current!.value === currentMotd) {
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
    <div className='center-display-space'>
      <form className='form-wrapper'>
        <label>
          <div className='form-input-label'>Message of the Day:</div>
          <textarea
            id='description'
            name='description'
            ref={motdRef}
            // maxLength={101}
            // onChange={(e)=> setCountData(e.currentTarget.value.length)}
            defaultValue={currentMotd}/>
        </label>

        <button
          className='button'
          type='submit'
          onClick={(e)=> submitHandler(e)}>
            Save Changes
        </button>
      </form>
    </div>
  );
};

export default AdminPanel;