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

  const errorButton = (clearFunction: Function) => {
    return (
      <button 
        data-testid='error close button'
        className='close-button'
        onClick={()=> dispatch(clearFunction())}
      >
        <div className='button-text'>X</div>
      </button>
    )};
    
  return (
    <div>
      { !!uiError?.length &&
        <div className="error">
          Error: {uiError}
          {errorButton(clearUiError)}
        </div>
      }
      { !!controlError?.length &&
        <div className="error">
          Control Error: {controlError}
          {errorButton(clearControlError)}
        </div>
      }
      { !!awardsError?.length &&
        <div className="error">
          Awards Error: {awardsError}
          {errorButton(clearAwardError)}
        </div>
      }
      { !!employeesError?.length &&
        <div className="error">
          Employees Error: {employeesError}
          {errorButton(clearEmployeeError)}
        </div>
      }
      { !!notificationsError?.length &&
        <div className="error">
          Notifications Error: {notificationsError}
          {errorButton(clearNotificationsError)}
        </div>
      }
      { !!projectsError?.length &&
        <div className="error">
          Projects Error: {projectsError}
          {errorButton(clearProjectError)}
        </div>
      }
      { !!ranksError?.length &&
        <div className="error">
          Ranks Error: {ranksError}
          {errorButton(clearRankError)}
        </div>
      }
    </div>
  );
};

export default ErrorDisplay;