import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import { clearEmployeeError } from "../../../redux/slices/employeesSlice";
import { clearControlError, clearUiError } from "../../../redux/slices/controlsSlice";
import { clearProjectError } from "../../../redux/slices/projectsSlice";
import { clearRankError } from "../../../redux/slices/ranksSlice";
import "./errorDisplay.css";

const ErrorDisplay: React.FC = () => {
  const controlError: string = useAppSelector((state)=> state.mainControl.error);
  const employeeError: string = useAppSelector((state)=> state.employeesControl.error);
  const projectError: string = useAppSelector((state)=> state.projectsControl.error);
  const rankError: string = useAppSelector((state)=> state.ranksControl.error);
  const uiError: string = useAppSelector((state)=> state.mainControl.uiError);

  const generateError = (type: string, error: string): JSX.Element => {
    const dispatch = useAppDispatch();

    const generateCloseButton = (): JSX.Element => {
      if (type === "control") return (
        <button className="button close-button" onClick={()=> dispatch(clearControlError())}>
          <div className="button-text">
            X
          </div>
        </button>
      );
      else if (type === "employee") return (
        <button className="button close-button" onClick={()=> dispatch(clearEmployeeError())}>
          <div className="button-text">
            X
          </div>
        </button>
      );
      else if (type === "project") return (
        <button className="button close-button" onClick={()=> dispatch(clearProjectError())}>
          <div className="button-text">
            X
          </div>
        </button>
      );
      else if (type === "rank") return (
        <button className="button close-button" onClick={()=> dispatch(clearRankError())}>
          <div className="button-text">
            X
          </div>
        </button>
      );
      else return (
        <button className="button close-button" onClick={()=> dispatch(clearUiError())}>
          <div className="button-text">
            X
          </div>
        </button>
      );
    };

    return (
      <>
        {error} {generateCloseButton()}
      </>
    )
  }

  return (
    <div className={`error-display ${ controlError.length || employeeError.length || projectError.length || rankError.length || uiError.length ? "" : "inactive" }`}>
      { uiError.length ?
        <>{generateError("ui", uiError)}</>
        :
        ""
      }
      { controlError.length ?
        <>{generateError("control", controlError)}</>
        :
        ""
      }
      { employeeError.length ?
        <>{generateError("employee", employeeError)}</>
        :
        ""
      }
      { projectError.length ?
        <>{generateError("project", projectError)}</>
        :
        ""
      }
      { rankError.length ?
        <>{generateError("rank", rankError)}</>
        :
        ""
      }
    </div>
  );
};

export default ErrorDisplay;