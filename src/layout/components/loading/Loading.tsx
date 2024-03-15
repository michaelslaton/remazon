import { RotatingLines } from 'react-loader-spinner';
import './loading.css';

const Loading: React.FC = () => {

  return (
    <div className='loading-wrapper'>
      <RotatingLines
        strokeColor='#ffa500'
        strokeWidth='2'
        />
    </div>
  );
};

export default Loading;