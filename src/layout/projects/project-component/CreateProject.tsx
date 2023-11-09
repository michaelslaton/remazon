import { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { ProjectPostType } from "../../../types/projectType";
import { createProjectThunk } from "../../../redux/slices/projectsSlice";
import "../projects.css";
import { useNavigate } from "react-router-dom";

const CreateProject: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentEmployee = useAppSelector((state)=> state.employeesControl.currentEmployee);
  const nameRef = useRef<HTMLInputElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const submitHandler: Function = (e: React.FormEvent): void => {
    e.preventDefault();
    const newProject: ProjectPostType = {
      name: nameRef.current!.value,
      host: currentEmployee!.id,
      type:typeRef.current!.value,
      description: descriptionRef.current!.value,
    };

    dispatch(createProjectThunk(newProject));
    navigate(-1);
    return
  };

  return (
    <>
      <h2 className="title">Create Project</h2>
      <form className="project__edit-form">

        <label>
          Name:
          <input
            type="text"
            id="name"
            name="name"
            ref={nameRef}/>
        </label>

        <label>
          Type:
          <select
            id="type"
            name="type"
            ref={typeRef}>
            <option value="string">Eh ??</option>
          </select>
        </label>

        <label>
          Description:
          <textarea
            id="description"
            name="description"
            ref={descriptionRef}/>
        </label>

        <button className="button project__edit-control" type="submit" onClick={(e)=> submitHandler(e)}>Submit</button>
          <button className="button project__edit-control" onClick={()=> navigate("/projects")}>Cancel</button>
      </form>
    </>
  );
};

export default CreateProject;