import { useRef, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import EmployeeType from "../../../types/employee.type";
import AwardType, { AwardPostType } from "../../../types/award.type";
import { createAwardThunk } from "../../../redux/slices/awardsSlice";
import { setUiError } from "../../../redux/slices/controlsSlice";

const CreateAward: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();
  const dispatch = useAppDispatch();
  const [ awardedForCountData, setAwardedForCountData ] = useState<number>(0);
  const nameRef = useRef<HTMLInputElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);
  const holderRef = useRef<HTMLSelectElement>(null);
  const awardedForRef = useRef<HTMLTextAreaElement>(null);
  const awardList: AwardType[] = useAppSelector((state)=> state.awardsControl.awards);
  const employeesList: EmployeeType[] = useAppSelector((state)=> state.employeesControl.employees);

  const submitHandler: Function = (e: React.FormEvent): void => {
    e.preventDefault();
    let awardDate = new Date();
    let awardHolder: number | null = 0;
    if(Number(holderRef.current?.value) > 0) awardHolder = Number(holderRef.current!.value);
    else awardHolder = null;

    if (nameRef.current!.value.length <= 1) {
      dispatch(setUiError('Name length is too short.'));
      return;
    };
    if (nameRef.current!.value.length > 21) {
      dispatch(setUiError('Please shorten then name length to less than 22 characters.'));
      return;
    };
    for(let i=0;i<awardList.length;i++){
      if(awardList[i].name.toLocaleLowerCase() === nameRef.current!.value.toLocaleLowerCase()){
        dispatch(setUiError('That name is taken.'));
        return;
      };
    };
    if (awardedForRef.current!.value.length > 200) {
      dispatch(setUiError('Please shorten your awarded for description to 200 characters or less.'));
      return;
    };

    const newAward: AwardPostType = {
      name: nameRef.current!.value,
      type: typeRef.current!.value,
      date: awardDate,
      holder: awardHolder,
      awardedFor: awardedForRef.current!.value,
    };

    dispatch(createAwardThunk(newAward))
      .then(()=> navigate('/awards'))
      .catch((error) => {
        dispatch(setUiError(error.message));
        console.error(error.code);
        console.error(error.message);
      });
    return;
  };

  return (
    <div className='center-display-space'>
      <form className='form-wrapper'>
        <h2 className='title form-title'>
          Create Award
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
          />

          <label
            htmlFor='type'
            className='form-input-label'
          >
            Type:
          </label>
          <select
            id='type'
            name='type'
            ref={typeRef}
          >
            <option value='belt'>
              Belt
            </option>
            <option value='trophy'>
              Trophy
            </option>
          </select>

          <label
            htmlFor='holder'
            className='form-input-label'
          >
            Current Award Holder:
          </label>
          <select
            id='holder'
            name='holder'
            ref={holderRef}
          >
            <option
              value={0}
            >
              Unawarded
            </option>
            { employeesList.map((employee)=>(
              <option
                key={employee.id}
                value={employee.id}
              >
                {employee.name}
              </option>
            ))}

          </select>

          <label
            htmlFor='awarded for'
            className='form-input-label'
          >
            Awarded For:
          </label>
          <textarea
            id='awarded for'
            name='awarded for'
            ref={awardedForRef}
            maxLength={200}
            rows={3}
            onChange={(e)=> setAwardedForCountData(e.currentTarget.value.length)}
          />
          <div className='parameter-text parameter-gap'>
            {awardedForCountData} of 200
          </div>
        </div>

        <div className='form__control-wrapper'>
          <button
            className='button form__control'
            type='submit'
            onClick={(e) => submitHandler(e)}
          >
            Submit
          </button>
          <button
            className='button form__control'
            onClick={() => navigate('/awards')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAward;