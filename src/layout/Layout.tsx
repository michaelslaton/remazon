import { Outlet } from 'react-router-dom';
import Navbar from './navbar/Navbar';
import Header from './header/Header';
import { useAppSelector } from '../redux/hooks';
import './layout.css';

const Layout: React.FC = () => {
  const navActive: boolean = useAppSelector((state)=> state.mainControl.navOpen);

  return (
    <>
      <Navbar/>
      <div className={`main-screen ${ navActive ? 'active' : ''}`}>
        <Header/>
        <Outlet/>
      </div>
    </>
  );
};

export default Layout;