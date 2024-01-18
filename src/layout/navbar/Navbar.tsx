import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getAuth, signOut } from 'firebase/auth';
import CollapseButton from './collapse-button/CollapseButton';
import LinkButton from './link-button/LinkButton';
import { faHouse, faProjectDiagram, faUsers, faRankingStar, faStar, faTrophy, faSignIn, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import EmployeeType from '../../types/employeeType';
import './navbar.css';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { clearCurrentEmployee } from '../../redux/slices/employeesSlice';
import { useState } from 'react';

export type LinkButtonData = {
  id: number;
  name: string;
  url: string;
  icon: IconDefinition;
};

const navData: LinkButtonData[] = [
  {
    id: 1,
    name: 'Home',
    url: '/',
    icon: faHouse,
  },
  {
    id: 2,
    name: 'Employees',
    url: '/employees',
    icon: faUsers,
  },
  {
    id: 3,
    name: 'Projects',
    url: '/projects',
    icon: faProjectDiagram,
  },
  {
    id: 4,
    name: 'Awards',
    url: '/awards',
    icon: faTrophy,
  }
];

const Navbar: React.FC = () => {
  const [ hovering, setHovering ] = useState<boolean>(false)
  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();
  const auth = getAuth();
  const navActive: boolean = useAppSelector((state)=> state.mainControl.navOpen);
  const currentEmployee: EmployeeType | null = useAppSelector((state)=> state.employeesControl.currentEmployee);

  const logoutHandler = (): void => {
    navigate(0);
    signOut(auth);
    dispatch(clearCurrentEmployee());
  };

  return (
    <div className={`navbar__wrapper ${ navActive ? 'active' : ''}`}>
      <CollapseButton/>
      <div className="navbar__link-buttons-wrapper">
        {navData.map((data)=>(
          <LinkButton key={data.id} data={data}/>
        ))}
        { !currentEmployee &&
          <>
            <LinkButton data={{
              id: 5,
              name: 'Sign In',
              url: '/signin',
              icon: faSignIn,
            }}/>
          </>
        }
        { currentEmployee?.admin &&
          <>
            <LinkButton data={{
              id: 6,
              name: 'Ranks',
              url: '/ranks',
              icon: faRankingStar,
            }}/>
            <LinkButton data={{
              id: 7,
              name: 'Admin',
              url: '/admin',
              icon: faStar,
            }}/>
          </>
        }
        { currentEmployee &&
          <>
            <button
              className={`link-button ${ navActive ? 'active' : ''}`}
              onClick={()=> logoutHandler()}
              onMouseOver={()=> setHovering(true)}
              onMouseOut={()=> setHovering(false)}
            >
              <FontAwesomeIcon icon={faSignOut}/> 
              { navActive &&
                <div className={`button__text ${ hovering ? 'hovering' : '' }`}>
                  Sign Out
                </div>
              }
            </button>
          </>
        }
      </div>
    </div>
  );
};

export default Navbar;