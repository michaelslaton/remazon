import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { createProjectThunk } from '../../../redux/slices/projectsSlice';
import { setUiError } from '../../../redux/slices/controlsSlice';
import { ProjectPostType } from '../../../types/project.type';
import { projectTypes } from '../../../data/projectTypes';
import EmployeeType from '../../../types/employee.type';
import '../projects.css';

const CreateProject: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [ descriptionCountData, setDescriptionCountData ] = useState<number>(0);
  const currentEmployee: EmployeeType | null = useAppSelector((state)=> state.employeesControl.currentEmployee);
  const nameRef = useRef<HTMLInputElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const submitHandler: Function = (e: React.FormEvent): void => {
    e.preventDefault();
    const currentDate: Date = new Date();
    const inputDate: Date = new Date(dateRef.current!.value);

    const dateFromRef = dateRef.current!.value.split('-');
    const projectDate = new Date(`${dateFromRef[1]}-${dateFromRef[2]}-${dateFromRef[0]}`)

    if (nameRef.current!.value.length <= 1) {
      dispatch(setUiError('Name length is too short.'));
      return;
    };
    if (!projectDate.getTime()) {
      dispatch(setUiError('Please select a date for the project.'));
      return;
    };
    if(currentDate.getTime() > inputDate.getTime()) {
      dispatch(setUiError('Please pick an upcoming Date and time.'));
      return;
    };
    if (descriptionRef.current!.value.length <= 1) {
      dispatch(setUiError('Description length is too short.'));
      return;
    };
    if (descriptionRef.current!.value.length > 200) {
      dispatch(setUiError('Please shorten your description to 200 characters or less.'));
      return;
    };

    const newProject: ProjectPostType = {
      name: nameRef.current!.value,
      host: currentEmployee!.id,
      type: typeRef.current!.value,
      attending: `${currentEmployee!.uid}`,
      date: projectDate,
      description: descriptionRef.current!.value,
    };
    
    dispatch(createProjectThunk(newProject))
      .then(()=> navigate('/projects'))
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
          Create Project
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
            htmlFor='date'
            className='form-input-label'
          >
            Date:
          </label>
          <input
            type='date'
            id='date'
            className='date-input'
            ref={dateRef}
            name='date'
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
            {projectTypes.map((type) => (
              <option
                key={type.id}
                value={type.name}
              >
                {type.name}
              </option>
            ))}
          </select>

          <label
            htmlFor='description'
            className='form-input-label'
          >
            Description:
          </label>
          <textarea
            id='description'
            name='description'
            maxLength={200}
            onChange={(e)=> setDescriptionCountData(e.currentTarget.value.length)}
            ref={descriptionRef}
          />
        </div>
        <div className='parameter-text parameter-gap'>
          {descriptionCountData} of 200
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
            onClick={() => navigate('/projects')}
          >
            Cancel
          </button>
        </div>

      </form>
    </div>
  );
};

export default CreateProject;