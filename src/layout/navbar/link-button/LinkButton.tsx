import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LinkButtonData } from '../Navbar';
import '../navbar.css';
import { navToggle } from '../../../redux/slices/controlsSlice';

type LinkButtonProps = {
  data: LinkButtonData,
};

const LinkButton: React.FC<LinkButtonProps> = ({ data }) => {
  const navActive: boolean = useAppSelector((state)=> state.mainControl.navOpen);
  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();

  const onClickHandler = (): void => {
    const windowWidth = document.documentElement.clientWidth;
    navigate(data.url)
    if( windowWidth <= 1280 && navActive) dispatch(navToggle());
  }

  return (
    <button className={`link-button ${ navActive ? 'active' : '' }`} onClick={()=> onClickHandler()}>
      { navActive ?
        <><FontAwesomeIcon icon={data.icon}/> {data.name}</>
        :
        <FontAwesomeIcon icon={data.icon}/>
      }
    </button>
  );
};

export default LinkButton;