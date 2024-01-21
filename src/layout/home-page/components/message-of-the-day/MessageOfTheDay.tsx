import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import './messageOfTheDay.css';
import { fetchMotdThunk } from '../../../../redux/slices/controlsSlice';

const MessageOfTheDay: React.FC = () => {
  const motd = useAppSelector((state)=> state.mainControl.motd);
  const dispatch = useAppDispatch();

  useEffect(()=>{
    dispatch(fetchMotdThunk());
  },[]);

  return (
    <>
      {motd.length ? 
        <div className='motd__container'>
          <div className='motd__wrapper'>
            <div className='motd__a-message'>
              A Message from the Boss!!
            </div>
            <div className='motd'>
              "{motd}"
              <div className='rembo'>
                - Rembo
              </div>
            </div>
          </div>
          <div className='placeholder'/>
        </div>
        :
        <></>
      }
    </>
  )
};

export default MessageOfTheDay;