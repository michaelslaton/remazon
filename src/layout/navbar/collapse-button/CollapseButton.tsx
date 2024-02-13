import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { navToggle } from '../../../redux/slices/controlsSlice';
import { faBars, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './collapseButton.css';

const CollapseButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const navActive: boolean = useAppSelector((state)=> state.mainControl.navOpen);

  return (
    <div className={`collapse-button__wrapper ${ navActive ? 'active' : '' }`}>
      <button className={`collapse-button ${ navActive ? 'active' : '' }`} onClick={()=>dispatch(navToggle())}>
        { navActive ? <FontAwesomeIcon icon={faX}/> : <FontAwesomeIcon icon={faBars}/> }
      </button>
    </div>
  );
};

export default CollapseButton;