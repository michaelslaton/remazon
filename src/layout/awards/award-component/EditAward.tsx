import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import AwardType from "../../../types/award.type";
import { useEffect, useRef, useState } from "react";
import EmployeeType from "../../../types/employee.type";
import { setUiError } from "../../../redux/slices/controlsSlice";
import { editAwardThunk } from "../../../redux/slices/awardsSlice";

const EditAward:React.FC = () => {
  const { paramId } = useParams<string>();
  const navigate: NavigateFunction = useNavigate();
  const dispatch = useAppDispatch();
  // States ------------------------------------------------------------------ >
  const [ awardedForCountData, setAwardedForCountData ] = useState<number>(0);
  const [ nameCountData, setNameCountData ] = useState<number>(0);
  const awardList: AwardType[] = useAppSelector((state)=> state.awardsControl.awards);
  const employeeList: EmployeeType[] = useAppSelector((state)=> state.employeesControl.employees);
  const selectedAward: AwardType | undefined = awardList.find((award)=> award.id === Number(paramId));
  // Refs -------------------------------------------------------------------- >
  const nameRef = useRef<HTMLInputElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);
  const holderRef = useRef<HTMLSelectElement>(null);
  const awardedForRef = useRef<HTMLTextAreaElement>(null);
  const retiredRef = useRef<HTMLInputElement>(null);

  useEffect(()=> {
    setAwardedForCountData(selectedAward!.awardedFor!.length);
    setNameCountData(selectedAward!.name.length);
  },[]);

  const checkForVariance = (): boolean => {
    if (
      nameRef.current!.value === selectedAward!.name &&
      typeRef.current!.value === selectedAward!.type &&
      Number(holderRef.current!.value) === selectedAward!.holder &&
      awardedForRef.current!.value === selectedAward!.awardedFor &&
      retiredRef.current!.checked === selectedAward!.retired
    ) return false;
    return true
  }

  const submitHandler: Function = (e: React.FormEvent): void => {
    e.preventDefault();
    let awardDate = new Date(selectedAward!.date);
    let awardHolder = null;
    if(Number(holderRef.current!.value) > 0) awardHolder = Number(holderRef.current!.value);
    
    if (!checkForVariance()) {
      dispatch(setUiError('No changes have been made.'));
      return;
    };
    // Name > 1 character and exists
    if (nameRef.current!.value.length < 1) {
      dispatch(setUiError('Please enter a name for the Award.'));
      return;
    };
    // If the name is greater than the allowed length of 21
    if (nameRef.current!.value.length > 21) {
      dispatch(setUiError('Please shorten then name length to less than 22 characters.'));
      return;
    };
    // If the name is already taken
    for(let i=0;i<awardList.length;i++){
      if(
          awardList[i].name.toLocaleLowerCase() === nameRef.current!.value.toLocaleLowerCase() &&
          awardList[i].id !== selectedAward!.id
        ){
        dispatch(setUiError('That name is taken.'));
        return;
      };
    };
    // If the description is greater than the allowed length of 200
    if (awardedForRef.current!.value.length > 200) {
      dispatch(setUiError('Please shorten your awarded for description to 200 characters or less.'));
      return;
    };

    if(holderRef.current?.value !== selectedAward?.holder){
      if(!window.confirm('Are you sure you wish to change the holder?\n This will adjust the date on the award and is an irreversible change.')) return;
    };

    if(Number(selectedAward!.holder) !== Number(holderRef.current!.value)) awardDate = new Date();
    const updatedAward: AwardType = {
      ...selectedAward!,
      name: nameRef.current!.value,
      type: typeRef.current!.value,
      holder: awardHolder,
      awardedFor: awardedForRef.current!.value,
      date: awardDate,
      retired: retiredRef.current!.checked,
    };
    
    console.log(updatedAward)
    dispatch(editAwardThunk(updatedAward))
    .then(()=> navigate('/awards'))
    .catch((error) => {
      dispatch(setUiError(error.message));
      console.error(error.code);
      console.error(error.message);
    });
    return;
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
              maxLength={21}
              defaultValue={selectedAward!.name}
            />
            <div className='parameter-text'>
              {nameCountData} of 21
            </div>

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
              defaultValue={Number(selectedAward?.holder)}
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
              defaultValue={selectedAward?.awardedFor}
            />
            <div className='parameter-text'>
              {awardedForCountData} of 200
            </div>

            <div>
                <label
                  htmlFor='retired'
                  className='form-input-label'
                >
                  Retired Status:
                </label>
                <input
                  className='checkbox'
                  type='checkbox'
                  id='retired'
                  name='retired'
                  ref={retiredRef}
                  defaultChecked={selectedAward?.retired}
                />
              </div>

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