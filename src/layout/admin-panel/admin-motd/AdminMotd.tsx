import { useRef, useState } from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { setUiError, updateMotdThunk } from '../../../redux/slices/controlsSlice';
import './adminMotd.css';

const AdminMotd: React.FC = () => {
  const [ countData, setCountData ] = useState<number>(0);
  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();
  const currentMotd: string = useAppSelector((state)=> state.mainControl.motd);
  const formRef = useRef<HTMLFormElement>(null);
  const motdRef = useRef<HTMLTextAreaElement>(null);

  const submitHandler: Function = (e: React.FormEvent): void => {
    e.preventDefault();
    if (motdRef.current!.value.length > 100) {
      dispatch(setUiError('Please shorten your Message of the Day length to 100 characters or less.'));
      return;
    };
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
    <form className='admin-widget' ref={formRef}>
      <h2 className='admin-widget__title'>Message of the Day</h2>
      
      <div className='form__inputs'>
        <label
          htmlFor='description'
          className='form-input-label'
        >
          Message:
        </label>
        <textarea
          id='message'
          name='message'
          rows={4}
          ref={motdRef}
          maxLength={100}
          onChange={(e)=> setCountData(e.currentTarget.value.length)}
          placeholder={currentMotd}
        />
        <div className='parameter-text parameter-gap'>
          {countData} of 100
        </div>
      </div>

      <div className='form__control-wrapper'>
        <button
          className='button form__control'
          type='button'
          onClick={()=> formRef.current!.reset()}
        >
          Clear
        </button>
        <button
          className='button form__control'
          type='submit'
          onClick={(e)=> submitHandler(e)}
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default AdminMotd;