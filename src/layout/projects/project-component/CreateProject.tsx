import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { ProjectPostType } from '../../../types/projectType';
import { createProjectThunk } from '../../../redux/slices/projectsSlice';
import { projectTypes } from '../../../data/projectTypes';
import '../projects.css';
import { setUiError } from '../../../redux/slices/controlsSlice';

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

    if(nameRef.current!.value.length < 1) {
      dispatch(setUiError('Name length is too short.'));
      return;
    };
    if(descriptionRef.current!.value.length < 1) {
      dispatch(setUiError('Description length is too short.'));
      return;
    };
    if(!projectDate.getTime()) {
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
    return
  };

  return (
    <div className='center-display-space'>
      <div className='form-wrapper'>
        <h2 className='title'>Create Project</h2>
        <form className='project__edit-form'>

          <label>
            Name:
            <input
              type='text'
              id='name'
              name='name'
              ref={nameRef}>
            </input>
          </label>

          <label>
            <div className='form-input-label'>Date:</div>
            <input
              type='date'
              id='date'
              className='date-input'
              ref={dateRef}
              name='date'>
            </input>
          </label>

          <label>
            Type:
            <select
              id='type'
              name='type'
              ref={typeRef}>
              {
                projectTypes.map((type)=> (
                  <option key={type.id} value={type.name}>{type.name}</option>
                ))
              }
            </select>
          </label>

          <label>
            Description:
            <textarea
              id='description'
              name='description'
              ref={descriptionRef}>
            </textarea>
          </label>

          <button className='button project__edit-control' type='submit' value='send' onClick={(e)=> submitHandler(e)}>Submit</button>
          <button className='button project__edit-control' onClick={()=> navigate('/projects')}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;