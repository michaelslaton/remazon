import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import './messageOfTheDay.css';
import { fetchMotdThunk } from '../../../../redux/slices/controlsSlice';
import banner from '../../../../assets/imgs/motdBanner.jpg'

const MessageOfTheDay: React.FC = () => {
  const motd: string = useAppSelector((state)=> state.mainControl.motd);
  const dispatch = useAppDispatch();

  useEffect(()=>{
    dispatch(fetchMotdThunk());
  },[]);

  return (
    <>
      { motd.length ? 
        <div className='motd__container'>
          <div className='motd__message-container'>
            <div className='motd__message-wrapper'>
              <h2 className='motd__message-from-the-boss'>
                A Message from the Boss!!
              </h2>
              <h2 className='motd'>
                "{motd}"
              </h2>
              <h3 className='rembo'>
                - Rembo
              </h3>
            </div>
          </div>
          <div className='motd__banner-wrapper'>
            <img src={banner}/>
          </div>
        </div>
        :
        <div className='motd__container'>
          <div className='motd__wrapper'>
            <h2 className='motd'>
              Welcome to Remazon Prime
            </h2>
          </div>
          <div className='motd__banner-wrapper'>
            <img src={banner}/>
          </div>
        </div>
      }
    </>
  )
};

export default MessageOfTheDay;