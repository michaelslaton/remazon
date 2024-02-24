import { useRef, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { editProjectThunk } from '../../../redux/slices/projectsSlice';
import { setUiError } from '../../../redux/slices/controlsSlice';
import { projectTypes } from '../../../data/projectTypes';
import ProjectType from '../../../types/projectType';
import EmployeeType from '../../../types/employeeType';
import '../projects.css';

const EditProject: React.FC = () => {
  const { paramId } = useParams<string>();
  const [ countData, setCountData ] = useState<number>(0);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const projectsList: ProjectType[] = useAppSelector((state)=> state.projectsControl.projects);
  const currentEmployee: EmployeeType | null = useAppSelector((state)=> state.employeesControl.currentEmployee);
  const employeesList = useAppSelector((state)=> state.employeesControl.employees);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLInputElement>(null);
  const hostRef = useRef<HTMLSelectElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const selectedProject: ProjectType | undefined = projectsList.find((project)=> project.id === Number(paramId));

  // Date formatting ---->
  let projectDate: Date = new Date(selectedProject!.date);
  const year = projectDate.getFullYear();
  const month = (projectDate.getMonth() + 1).toString().padStart(2, "0");
  const day = projectDate.getDate().toString().padStart(2, "0");
  const hours = projectDate.getHours().toString().padStart(2, "0");
  const minutes = projectDate.getMinutes().toString().padStart(2, "0");
  // -->

  useEffect(()=> setCountData(selectedProject!.description.length),[]);

  const checkForVariance = (): boolean => {
    let dateCheck: boolean = false;
    let updatedDate: Date | null = null;
    const dateRefValue = new Date(dateRef.current!.value);

    if (dateRefValue) updatedDate = new Date(dateRefValue);
    if (projectDate!.getTime() !== updatedDate!.getTime()) {
      dateCheck = true;
      projectDate = updatedDate!;
    };

    if (
      nameRef.current!.value === selectedProject?.name &&
      descriptionRef.current!.value === selectedProject?.description &&
      statusRef.current!.checked === selectedProject?.status &&
      Number(hostRef.current!.value) === selectedProject?.host &&
      typeRef.current!.value === selectedProject?.type &&
      !dateCheck
      ) return false;
    else return true;
  };

  const submitHandler: Function = (e: React.FormEvent): void => {
    e.preventDefault();

    let inputHost = selectedProject!.host;
    if (currentEmployee!.admin) inputHost = Number(hostRef.current!.value);
    
    if (nameRef.current!.value.length < 1) {
      dispatch(setUiError('Please enter a name for the project.'));
      return;
    };
    if (descriptionRef.current!.value.length > 200) {
      dispatch(setUiError('Please shorten your description to 200 characters or less.'));
      return;
    };
    if (!checkForVariance()) {
      dispatch(setUiError('No changes have been made.'));
      return;
    };

    const updatedProject: ProjectType = {
      ...selectedProject!,
      id: Number(paramId),
      name: nameRef.current!.value,
      host: inputHost,
      date: projectDate,
      type: typeRef.current!.value,
      description: descriptionRef.current!.value,
      status: statusRef.current!.checked,
    };
    dispatch(editProjectThunk(updatedProject));
    navigate(-1);
    return;
  };

  return (
    <>
      <div className='display__header'>
        <h2>Projects</h2>
      </div>
      <div className='display__controls'/>

      <div className='center-display-space'>
        <form className='form-wrapper'>
          <h2 className='title form-title'>
            Edit {selectedProject!.name}
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
              defaultValue={selectedProject?.name}
            />

            { currentEmployee!.admin &&
              <>
                <label
                  htmlFor='host'
                  className='form-input-label'
                >
                  Host:
                </label>
                <select
                  id='host'
                  name='host'
                  ref={hostRef}
                  defaultValue={selectedProject?.host}
                >
                  {employeesList?.map((employee)=> (
                    <option key={employee.id} value={employee.id}>{employee.name}</option>
                  ))}
                </select>
              </>
            }

            <label
              htmlFor='date'
              className='form-input-label'
            >
              Date:
            </label>
            <input
              type='datetime-local'
              id='date'
              name='date'
              className='date-input'
              ref={dateRef}
              defaultValue={`${year}-${month}-${day}T${hours}:${minutes}`}
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
              defaultValue={selectedProject?.type}
            >
              {
                projectTypes.map((type)=> (
                  <option key={type.id} value={type.name}>{type.name}</option>
                ))
              }
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
              maxLength={200}
              onChange={(e)=> setCountData(e.currentTarget.value.length)}
              defaultValue={selectedProject?.description}
            />
            <div className='parameter-text'>
              {countData} of 200
            </div>

            <div>
              <label
                htmlFor='status'
                className='form-input-label'
              >
                Active:
              </label>
              <input
                className='checkbox'
                type='checkbox'
                id='status'
                name='status'
                ref={statusRef}
                defaultChecked={selectedProject?.status}
              />
            </div>
          </div>

          <div className='form__control-wrapper'>
            <button
              className='button form__control'
              type='submit'
              onClick={(e)=> submitHandler(e)}
            >
              Submit
            </button>
            <button
              className='button form__control'
              onClick={()=> navigate('/projects')}
            >
              Cancel
            </button>
          </div>
          
        </form>
      </div>
    </>
  );
};

export default EditProject;