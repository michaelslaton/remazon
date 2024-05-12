import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getAuth, signOut } from 'firebase/auth';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { clearCurrentEmployee } from '../../redux/slices/employeesSlice';
import { faHouse, faProjectDiagram, faRankingStar, faStar, faTrophy, faSignIn, faSignOut, faAddressCard, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import CollapseButton from './collapse-button/CollapseButton';
import LinkButton from './link-button/LinkButton';
import EmployeeType from '../../types/employee.type';
import './navbar.css';

export type LinkButtonData = {
  id: number;
  name: string;
  url: string;
  icon: IconDefinition;
  callback?: Function;
  styling?: string;
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
    icon: faAddressCard,
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
  },
];

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();
  const auth = getAuth();
  const navActive: boolean = useAppSelector((state)=> state.mainControl.navOpen);
  const currentEmployee: EmployeeType | null = useAppSelector((state)=> state.employeesControl.currentEmployee);

  const logoutHandler = (): void => {
    if(!window.confirm('Are you sure you wish to Sign Out?')) return;
    signOut(auth);
    dispatch(clearCurrentEmployee());
    navigate(0);
  };

  return (
    <div className={`navbar__wrapper ${ navActive && 'active'}`}>
      <CollapseButton/>

      <div className='navbar__link-buttons-wrapper'>
        {navData.map((data)=>(
          <LinkButton
            key={data.id}
            data={data}
          />
        ))}

        { currentEmployee?.admin &&
          <LinkButton
            data={{
              id: 9,
              name: 'Admin',
              url: '/admin',
              icon: faStar,
            }}
          />
        }

        {/* <LinkButton
          data={{
            id: 5,
            name: 'Info',
            url: '/info',
            icon: faCircleInfo,
            styling: 'info-button',
          }}
        /> */}

        { !currentEmployee &&
          <LinkButton
            data={{
              id: 6,
              name: 'Sign In',
              url: '/signin',
              icon: faSignIn,
              styling: 'authentication-button'
            }}
          />
        }
        { currentEmployee &&
          <LinkButton
            data={{
              id: 7,
              name: 'Sign Out',
              url: '/',
              icon: faSignOut,
              styling: 'authentication-button',
              callback: logoutHandler,
            }}
          />
        }

      </div>
    </div>
  );
};

export default Navbar;