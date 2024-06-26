import UserDisplay from './user-display/UserDisplay';
import ErrorDisplay from './error-display/ErrorDisplay';
import './header.css';

const Header: React.FC = () => {

  return (
    <>
      <div className='header__wrapper'>
        <div>
          <h1 className='header__title'>
            <section className='remazon'>Remazon</section><section className='prime'>Prime</section>
          </h1>
        </div>
        <div className='header__items'>
          <UserDisplay/>
        </div>
      </div>
      <ErrorDisplay/>
    </>
  );
};

export default Header;