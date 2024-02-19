import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { clearAwardError } from '../../../redux/slices/awardsSlice';
import { clearEmployeeError } from '../../../redux/slices/employeesSlice';
import { clearNotificationsError } from '../../../redux/slices/notificationsSlice';
import { clearProjectError } from '../../../redux/slices/projectsSlice';
import { clearRankError } from '../../../redux/slices/ranksSlice';
import { clearControlError, clearUiError } from '../../../redux/slices/controlsSlice';
import './errorDisplay.css';

const ErrorDisplay: React.FC = () => {
  const controlError: string | undefined = useAppSelector((state)=> state.mainControl.error);
  const uiError: string | undefined = useAppSelector((state)=> state.mainControl.uiError);
  const awardsError: string | undefined = useAppSelector((state)=> state.awardsControl.error);
  const employeesError: string | undefined = useAppSelector((state)=> state.employeesControl.error);
  const notificationsError: string | undefined = useAppSelector((state)=> state.notificationsControl.error);
  const projectsError: string | undefined = useAppSelector((state)=> state.projectsControl.error);
  const ranksError: string | undefined = useAppSelector((state)=> state.ranksControl.error);
  const dispatch = useAppDispatch();
    
  return (
    <div>
      { uiError!.length ?
        <div className={`error`}>
          Awards Error: {uiError}
          <button 
            className='close-button'
            onClick={()=> dispatch(clearUiError())}>
              <div className='button-text'>X</div>
          </button>
        </div>
        :
        <></>
      }
      { controlError!.length ?
        <div className={`error`}>
          Awards Error: {controlError}
          <button 
            className='close-button'
            onClick={()=> dispatch(clearControlError())}>
              <div className='button-text'>X</div>
          </button>
        </div>
        :
        <></>
      }
      { awardsError!.length ?
        <div className={`error`}>
          Awards Error: {awardsError}
          <button 
            className='close-button'
            onClick={()=> dispatch(clearAwardError())}>
              <div className='button-text'>X</div>
          </button>
        </div>
        :
        <></>
      }
      { employeesError!.length ?
        <div className={`error`}>
          Employees Error: {employeesError}
          <button 
            className='close-button'
            onClick={()=> dispatch(clearEmployeeError())}>
              <div className='button-text'>X</div>
          </button>
        </div>
        :
        <></>
      }
      { notificationsError!.length ?
        <div className={`error`}>
          Notifications Error: {notificationsError}
          <button 
            className='close-button'
            onClick={()=> dispatch(clearNotificationsError())}>
              <div className='button-text'>X</div>
          </button>
        </div>
        :
        <></>
      }
      { projectsError!.length ?
        <div className={`error`}>
          Projects Error: {projectsError}
          <button 
            className='close-button'
            onClick={()=> dispatch(clearProjectError())}>
              <div className='button-text'>X</div>
          </button>
        </div>
        :
        <></>
      }
      { ranksError!.length ?
        <div className={`error`}>
          Ranks Error: {ranksError}
          <button 
            className='close-button'
            onClick={()=> dispatch(clearRankError())}>
              <div className='button-text'>X</div>
          </button>
        </div>
        :
        <></>
      }
    </div>
  );
};

export default ErrorDisplay;