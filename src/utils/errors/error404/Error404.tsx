import { useNavigate } from 'react-router-dom';
import './error404.css';

const Error404: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className='error404__wrapper'>
      <div className='error404__title--wrapper'>
        <h1 className='error404__title'>404</h1>
        <h2 className='error404__text'>Not Found</h2>
      </div>
      <div className='error404__links'>
        <button className='error404-link' onClick={()=> navigate('/')}>Go Home</button>
        <button className='error404-link' onClick={()=> navigate(-1)}>Go Back</button>
      </div>
    </div>
  );
};

export default Error404;