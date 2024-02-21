import { useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LinkButtonData } from '../Navbar';
import { navToggle } from '../../../redux/slices/controlsSlice';
import '../navbar.css';

type LinkButtonProps = {
  data: LinkButtonData,
};

const LinkButton: React.FC<LinkButtonProps> = ({ data }) => {
  const [ hovering, setHovering ] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();
  const navActive: boolean = useAppSelector((state)=> state.mainControl.navOpen);

  const onClickHandler = (): void => {
    const windowWidth = document.documentElement.clientWidth;
    navigate(data.url)
    if ( windowWidth <= 1280 && navActive) dispatch(navToggle());
  };

  return (
    <button
      className={`link-button ${ navActive && 'active'} ${ data.styling && `${data.styling}`}`}
      onClick={()=> {
        if (data.callback) data.callback(); 
        else onClickHandler();
      }}
      onMouseOver={() => setHovering(true)}
      onMouseOut={() => setHovering(false)}
    >
      { navActive ?
        <>
          <FontAwesomeIcon icon={data.icon}/>
          <div className={`button__text ${hovering && 'hovering'}`}>
            {` ${data.name}`}
          </div>
        </>
        :
        <FontAwesomeIcon icon={data.icon}/>
      }
    </button>
  );
};

export default LinkButton;