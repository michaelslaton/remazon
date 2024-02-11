import './routeError.css';

const RouteError: React.FC = () => {

  return (
    <div className='route-error__wrapper'>
      <div className='route-error__title--wrapper'>
        <div className='route-error__title'>Something went wrong...</div>
        <div className='route-error__text'>Please refresh the page...</div>
        <div className='error404__links'>
          <button className='error404-link' onClick={()=> location.reload()}>Refresh</button>
        </div>
      </div>
    </div>
  );
};

export default RouteError;