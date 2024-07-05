import { useRef, useState, useEffect } from 'react';
import { useParams, useNavigate, NavigateFunction } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { editEmployeeThunk } from '../../../redux/slices/employeesSlice';
import { setUiError } from '../../../redux/slices/controlsSlice';
import Rank from '../../../types/rank.type';
import EmployeeType from '../../../types/employee.type';
import '../employees.css';

const EditEmployee: React.FC = () => {
  const { paramId } = useParams<string>();
  const navigate: NavigateFunction = useNavigate();
  const dispatch = useAppDispatch();
  // States ------------------------------------------------------------------ >
  const [ countData, setCountData ] = useState<number>(0);
  const [ aliasData, setAliasData ] = useState<string[]>([]);
  const employeesList: EmployeeType[] = useAppSelector((state)=> state.employeesControl.employees);
  const currentEmployee: EmployeeType | null = useAppSelector((state)=> state.employeesControl.currentEmployee);
  const ranksList: Rank[] = useAppSelector((state)=> state.ranksControl.ranks);
  const selectedEmployee: EmployeeType | undefined = employeesList.find((dude)=> dude.id === Number(paramId));
  // Refs -------------------------------------------------------------------- >
  const nameRef = useRef<HTMLInputElement>(null);
  const bdayRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const rankRef = useRef<HTMLSelectElement>(null);
  const aliasRef = useRef<HTMLInputElement>(null);
  // Birthday formatting ------------------------------------------------------ >
  let employeeBirthday: Date | null = null;
  let updatedBirthday: Date | null = null;
  let birthdayString: string = '';
  if (selectedEmployee?.birthday) {
    employeeBirthday = new Date(selectedEmployee?.birthday);
    birthdayString = employeeBirthday.toISOString().split('T')[0];
  };
  // --- >

  useEffect(()=> {
    // if(!currentEmployee?.uid) navigate('/signin');
    setCountData(selectedEmployee!.description.length)
    if(selectedEmployee!.aliases) setAliasData(selectedEmployee!.aliases.split(","));
  },[]);

  // checkForVariance performs a series of checks to see if the intial state manages the current values of the form
  // checkForVariance returns false if no changes have been made, otherwise it returns true
  const checkForVariance = (): boolean => {
    let updatedRank = selectedEmployee!.rank;
    let birthdayCheck: boolean = false;
    if (currentEmployee!.admin) updatedRank = Number(rankRef.current?.value);

    if (bdayRef.current!.value) {
      const newBirthday = bdayRef.current!.value.split('-');
      updatedBirthday = new Date(`${newBirthday[1]}-${newBirthday[2]}-${newBirthday[0]}`);
    };
    
    if (updatedBirthday && employeeBirthday) {
      if (employeeBirthday.getTime() !== updatedBirthday.getTime()) birthdayCheck = true;
    }
    else if (employeeBirthday === null && updatedBirthday) birthdayCheck = true;

    if (
      nameRef.current?.value === selectedEmployee?.name &&
      descriptionRef.current!.value === selectedEmployee?.description &&
      aliasData.join(',') === selectedEmployee!.aliases &&
      updatedRank === selectedEmployee?.rank &&
      !birthdayCheck
      ) return false;
    else return true;
  };

  const handleAliasInput = (): void => {
    if(aliasRef.current?.value === '') return;
    const newAliasList: string[] = [...aliasData, aliasRef.current!.value ];
    setAliasData(newAliasList);
    aliasRef.current!.value = '';
    return;
  };

  const removeAlias = (aliasIndex: number): void => {
    const newAliasList: string[] = [...aliasData];
    newAliasList.splice(aliasIndex, 1);
    setAliasData(newAliasList);
    return;
  };

  const submitHandler: Function = (e: React.FormEvent): void => {
    e.preventDefault();
    let updatedRank = selectedEmployee!.rank;
    let nameSpacesCount = 0;

    if (!checkForVariance()) {
      dispatch(setUiError('No changes have been made.'));
      return;
    };
    if (nameRef.current!.value.length < 1) {
      dispatch(setUiError('Please enter a name for the employee.'));
      return;
    }
    for(let i=0; i<employeesList.length;i++){
      if(employeesList[i].name.toLocaleLowerCase() === nameRef.current!.value.toLocaleLowerCase() &&
      selectedEmployee!.id !== employeesList[i].id){
        dispatch(setUiError('That username is taken.'));
        return;
      }
    };
    for(let i=0; i<nameRef.current!.value.length; i++){
      if(nameRef.current!.value[i] === ' '){
        if(nameSpacesCount === 1){
          dispatch(setUiError(`Name can only be in the format of 'First Last'`));
          return;
        }
        nameSpacesCount++
      }
    };
    if (descriptionRef.current!.value.length > 100) {
      dispatch(setUiError('Please shorten your description to 100 characters or less.'));
      return;
    };

    if (updatedBirthday) employeeBirthday = updatedBirthday;
    if (selectedEmployee!.rank === 1) updatedRank = 1;
    else if (currentEmployee!.admin && selectedEmployee!.rank !== 1) updatedRank = Number(rankRef.current!.value);

    const updatedEmployee: EmployeeType = {
      ...selectedEmployee!,
      name: nameRef.current!.value,
      birthday: employeeBirthday,
      rank: updatedRank,
      description: descriptionRef.current!.value,
      admin: selectedEmployee!.admin,
      aliases: aliasData.join(','),
    };
    dispatch(editEmployeeThunk(updatedEmployee));
    navigate(-1);
    return;
  };

  return (
    <>
      <div className='display__header'>
        <h2>Employee Directory</h2>
      </div>
      <div className='display__controls'/>

      <div className='center-display-space'>
        <form className='form-wrapper'>
          <h2 className='title form-title'>
            Edit {selectedEmployee!.name}
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
              defaultValue={selectedEmployee?.name}
            />

            {currentEmployee?.admin && 
              selectedEmployee?.rank !== 1 && (
              <>
                <label
                  htmlFor='rank'
                  className='form-input-label'
                >
                  Rank:
                </label>
                <select
                  id='rank'
                  name='rank'
                  ref={rankRef}
                  defaultValue={selectedEmployee?.rank}
                >
                  {ranksList.map((rank) => rank.id !== 1 && (
                    <option key={rank.id} value={rank.rank}>
                      {rank.name}
                    </option>
                  ))}
                </select>
              </>
            )}

            <label
              htmlFor='birthday'
              className='form-input-label'
            >
              Birthday:
            </label>
            <input
              data-testid='employee birthday box'
              type='date'
              id='birthday'
              name='birthday'
              className='date-input'
              ref={bdayRef}
              defaultValue={birthdayString}
            />

            <label>
              Aliases:
            </label>
            <div
              data-testid='alias display'
              className='alias-display'
            >
              {aliasData.map((alias,i)=>(
                <div
                  key={i}
                  className='alias'
                >
                  {alias}
                  <button
                    data-testid='alias delete button'
                    type='button'
                    className='alias-button'
                    onClick={()=> removeAlias(i)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
            <div className='alias-input-wrapper'>
              <input
                type='text'
                aria-label='aliases'
                id='aliases'
                name='aliases'
                className='alias-input'
                ref={aliasRef}
              />
              <button
              data-testid='add alias button'
              type='button'
              className='button alias-input-button'
              onClick={()=> handleAliasInput()}
              >
                +
              </button>
            </div>

            <label
              htmlFor='description'
              className='form-input-label'
            >
              Description:
            </label>
            <textarea
              id='description'
              name='description'
              ref={descriptionRef}
              maxLength={100}
              onChange={(e) => setCountData(e.currentTarget.value.length)}
              defaultValue={selectedEmployee?.description}
            />
            <div className='parameter-text parameter-gap'>
              {countData} of 100
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
              onClick={() => navigate('/employees')}
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </>
  );
};

export default EditEmployee;