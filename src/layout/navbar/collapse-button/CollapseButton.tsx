import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { navToggle } from '../../../redux/slices/controlsSlice';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './collapseButton.css';

const CollapseButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const navActive: boolean = useAppSelector((state)=> state.mainControl.navOpen);

  return (
    <div className='collapse-button__wrapper'>
      <button className='button card-button collapse-button' onClick={()=>dispatch(navToggle())}>
        {navActive ? <FontAwesomeIcon icon={faArrowLeft}/> : <FontAwesomeIcon icon={faArrowRight}/>}
      </button>
    </div>
  );
};

export default CollapseButton;