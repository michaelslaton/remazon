import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { createProjectThunk } from '../../../redux/slices/projectsSlice';
import { setUiError } from '../../../redux/slices/controlsSlice';
import { ProjectPostType } from '../../../types/projectType';
import { projectTypes } from '../../../data/projectTypes';
import '../projects.css';

const CreateProject: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentEmployee = useAppSelector((state)=> state.employeesControl.currentEmployee);
  const nameRef = useRef<HTMLInputElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const submitHandler: Function = (e: React.FormEvent): void => {
    e.preventDefault();

    const dateFromRef = dateRef.current!.value.split('-');
    const projectDate = new Date(`${dateFromRef[1]}-${dateFromRef[2]}-${dateFromRef[0]}`)

    if (nameRef.current!.value.length < 1) {
      dispatch(setUiError('Name length is too short.'));
      return;
    };
    if (descriptionRef.current!.value.length < 1) {
      dispatch(setUiError('Description length is too short.'));
      return;
    };
    if (!projectDate.getTime()) {
      dispatch(setUiError('Please select a date for the project.'));
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
    
    dispatch(createProjectThunk(newProject));
    navigate(-1);
    return;
  };

  return (
    <div className='center-display-space'>
      <form className='form-wrapper project__edit-form'>
        <h2 className='title'>
          Create Project
        </h2>

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
          ref={descriptionRef}
        />

        <button
          className='button project__edit-control'
          type='submit'
          value='send'
          onClick={(e) => submitHandler(e)}
        >
          Submit
        </button>
        <button
          className='button project__edit-control'
          onClick={() => navigate('/projects')}
        >
          Cancel
        </button>

      </form>
    </div>
  );
};

export default CreateProject;