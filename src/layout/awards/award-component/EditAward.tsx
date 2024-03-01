import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import AwardType from "../../../types/awardType";
import { useRef } from "react";
import EmployeeType from "../../../types/employeeType";

const EditAward:React.FC = () => {
  const { paramId } = useParams<string>();
  const navigate: NavigateFunction = useNavigate();
  const dispatch = useAppDispatch();
  // States ------------------------------------------------------------------ >
  const awardList: AwardType[] = useAppSelector((state)=> state.awardsControl.awards);
  const employeeList: EmployeeType[] = useAppSelector((state)=> state.employeesControl.employees);
  const selectedAward: AwardType | undefined = awardList.find((award)=> award.id === Number(paramId));
  // Refs -------------------------------------------------------------------- >
  const nameRef = useRef<HTMLInputElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);
  const holderRef = useRef<HTMLSelectElement>(null);

  const submitHandler: Function = (e: React.FormEvent): void => {
    e.preventDefault();
  }

  return (
    <>
      <div className='display__header'>
        <h2>Edit Award</h2>
      </div>
      <div className='display__controls'/>

      <div className='center-display-space'>
        <form className='form-wrapper'>
          <h2 className='title form-title'>
            Edit {selectedAward!.name}
          </h2>

          <div className='form__inputs'>
            <label
              htmlFor='name'
              className='form-input-label'
            >
              Name: 
            </label>
            <input
              type='text'
              id='name'
              name='name'
              ref={nameRef}
              defaultValue={selectedAward!.name}
            />

            <label>
              Type: 
            </label>
            <select
              id='type'
              name='type'
              ref={typeRef}
              defaultValue={selectedAward!.type}
            >
              <option value='belt'>
                Belt
              </option>
              <option value='trophy'>
                Trophy
              </option>
            </select>
            
            <label>
              Awarded To: 
            </label>
            <select
              id='holder'
              name='holder'
              ref={holderRef}
              defaultValue={selectedAward?.holder}
            >
              <option
                key={0}
                value={0}
              >
                Unawarded
              </option>
              { employeeList.map((employee)=>(
                  <option
                    key={employee.id}
                    value={employee.id}
                  >
                    {employee.name}
                  </option>
              ))}
            </select>

            <div
              className='form__control-wrapper'
            >
              <button
                className='button form__control'
                type='submit'
                onClick={(e)=> submitHandler(e)}
              >
                Submit
              </button>

              <button
                className='button form__control'
                onClick={()=> navigate('/awards')}
              >
                Cancel
              </button>
            </div>

          </div>
        </form>
      </div>
    </>
  );
};

export default EditAward;