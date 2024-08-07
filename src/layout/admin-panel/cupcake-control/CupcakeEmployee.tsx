import { useAppDispatch } from '../../../redux/hooks';
import { setUiError } from '../../../redux/slices/controlsSlice';
import { editEmployeeThunk, fetchEmployeesListThunk } from '../../../redux/slices/employeesSlice';
import EmployeeType from '../../../types/employee.type';
import cupcake from '../../../assets/imgs/cupcake.png';
import './cupcakeControl.css';

type CupcakeEmployeeProps = {
  data: EmployeeType,
}

const CupcakeEmployee: React.FC<CupcakeEmployeeProps> = ({ data }) => {
  const dispatch = useAppDispatch();

  const handleCupcake = (type: string) => {
    if(type === 'add') {
      dispatch(editEmployeeThunk({
        ...data,
        cupcakes: data.cupcakes + 1
      }))
      .then(()=> dispatch(fetchEmployeesListThunk()) )
      .catch((error) => {
        dispatch(setUiError(error.message));
        console.error(error.code);
        console.error(error.message);
      });
    }
    if(type === 'minus') {
      if(data.cupcakes === 0) return;
      dispatch(editEmployeeThunk({
        ...data,
        cupcakes: data.cupcakes - 1
      }))
      .then(()=> dispatch(fetchEmployeesListThunk()) )
      .catch((error) => {
        dispatch(setUiError(error.message));
        console.error(error.code);
        console.error(error.message);
      });
    }
  }

  return (
    <div key={data.id} className='cupcake__listing'>
    <div className='cupcake__name'>
      {data.name}
    </div>
    <div className='cupcake__employee-buttons-wrapper'>
      <button
        className='button cupcake__employee-button'
        onClick={()=> handleCupcake('add')}
      >+</button>
      <button
        className='button cupcake__employee-button'
        onClick={()=> handleCupcake('minus')}
      >-</button>
    </div>
    <div className={`cupcake__number ${data.cupcakes % 2 !== 0 ? 'cupcake__pink' : ''}`}>
      {data.cupcakes}
      <img src={cupcake} className='cupcake'/>
    </div>
  </div>
  );
};

export default CupcakeEmployee;