import { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { editProjectThunk } from "../../../redux/slices/projectsSlice";
import { setUiError } from "../../../redux/slices/controlsSlice";
import ProjectType from "../../../types/projectType";
import EmployeeType from "../../../types/employeeType";
import "../projects.css";

const EditProject: React.FC = () => {
  const { paramId } = useParams<string>();
  const [ countData, setCountData ] = useState<number>(0);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const statusRef = useRef<HTMLInputElement>(null);
  const hostRef = useRef<HTMLSelectElement>(null);
  const typeRef = useRef<HTMLInputElement>(null);
  const projects: ProjectType[] = useAppSelector((state)=> state.projectsControl.projects)
  const currentEmployee: EmployeeType | null = useAppSelector((state)=> state.employeesControl.currentEmployee);
  const selectedProject: ProjectType | undefined = projects.find((project)=> project.id === Number(paramId));
  const employeesList = useAppSelector((state)=> state.employeesControl.employees);

  useEffect(()=> setCountData(selectedProject!.description.length),[]);

  const submitHandler: Function = (e: React.FormEvent): void => {
    e.preventDefault();
    let inputHost = selectedProject!.host;

    if (descriptionRef.current!.value.length > 200) {
      dispatch(setUiError("Please shorten your description to 200 characters or less."));
      return;
    };
    if (currentEmployee!.admin) inputHost = Number(hostRef.current!.value);

    const updatedProject: ProjectType = {
      ...selectedProject!,
      id: Number(paramId),
      name: nameRef.current!.value,
      host: inputHost,
      type: typeRef.current!.value,
      description: descriptionRef.current!.value,
      status: statusRef.current!.checked,
    };
    dispatch(editProjectThunk(updatedProject));
    navigate(-1);
    return;
  };

  return (
    <div className="center-display-space">
      <div className="form-wrapper">
        <h2 className="title">Edit {selectedProject!.name}</h2>
        <form className="project__edit-form">
          
          <label>
            <div className="form-input-label">Name:</div>
            <input
              type="text"
              id="name"
              name="name"
              ref={nameRef}
              defaultValue={selectedProject?.name}/>
          </label>

          { currentEmployee!.admin &&
            <label>
              <div className="form-input-label">Host:</div>
              <select
                id="host"
                name="host"
                ref={hostRef}
                defaultValue={selectedProject?.host}>
                  {employeesList?.map((employee)=> (
                    <option key={employee.id} value={employee.id}>{employee.name}</option>
                  ))}
              </select>
            </label>
          }

          <label>
            <div className="form-input-label">Type:</div>
            <input
              type="text"
              id="type"
              name="type"
              ref={typeRef}
              defaultValue={selectedProject?.type}/>
          </label>

          <label>
            <div className="form-input-label">Description:</div>
            <textarea
              id="description"
              name="description"
              ref={descriptionRef}
              maxLength={200}
              onChange={(e)=> setCountData(e.currentTarget.value.length)}
              defaultValue={selectedProject?.description}/>
          </label>
          <div className="parameter-text">
            {countData} of 200
          </div>

          <label>
            <div className="form-input-label">Active:</div>
            <input
              className="checkbox"
              type="checkbox"
              id="status"
              name="status"
              ref={statusRef}
              defaultChecked={selectedProject?.status}/>
          </label>

          <button className="button project__edit-control" type="submit" onClick={(e)=> submitHandler(e)}>Submit</button>
          <button className="button project__edit-control" onClick={()=> navigate("/projects")}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default EditProject;