import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import Navbar from './navbar/Navbar';
import Header from './header/Header';
import './layout.css';

const Layout: React.FC = () => {
  const navActive: boolean = useAppSelector((state)=> state.mainControl.navOpen);

  return (
    <>
      <Navbar/>
      <div data-testid='main screen' className={`main-screen ${ navActive && 'active'}`}>
        <Header/>
        <Outlet/>
      </div>
    </>
  );
};

export default Layout;