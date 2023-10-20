import { useRef } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { editProjectThunk } from "../../../redux/slices/projectsSlice";
import ProjectType from "../../../types/projectType";
import "../projects.css";

const EditProject: React.FC = () => {
  const { paramId } = useParams<string>();
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const statusRef = useRef<HTMLInputElement>(null);
  const hostRef = useRef<HTMLSelectElement>(null);
  const typeRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const projects: ProjectType[] = useAppSelector((state)=> state.projectsControl.projects)
  const selectedProject = projects.find((project)=> project.id === Number(paramId));  

  const submitHandler: Function = (e: React.FormEvent): void => {
    e.preventDefault();

    const updatedProject: ProjectType = {
      id: Number(paramId),
      name: nameRef.current!.value,
      host: Number(hostRef.current!.value),
      type: typeRef.current!.value,
      description: descriptionRef.current!.value,
      status: statusRef.current!.checked,
    };
    dispatch(editProjectThunk(updatedProject));
    return;
  };

  return (
    <>
      <h2 className="title">Edit {selectedProject!.name}</h2>
      <form>
        
        <label>
          Name:
          <input
            type="text"
            id="name"
            name="name"
            ref={nameRef}
            defaultValue={selectedProject?.name}/>
        </label>

        <label>
          Host:
          <select
            id="host"
            name="host"
            ref={hostRef}
            defaultValue={selectedProject?.host}>
            <option value="3">wrong</option>
            <option value="1">Right!</option>
            <option value="2">wrong</option>
          </select>
        </label>

        <label>
          Type:
          <input
            type="text"
            id="type"
            name="type"
            ref={typeRef}
            defaultValue={selectedProject?.type}/>
        </label>

        <label>
          Description:
          <textarea
            id="description"
            name="description"
            ref={descriptionRef}
            defaultValue={selectedProject?.description}/>
        </label>

        <label>
          Active:
          <input
            type="checkbox"
            id="status"
            name="status"
            ref={statusRef}
            defaultChecked={selectedProject?.status}/>
        </label>

        <button className="button" type="submit" onClick={(e)=> submitHandler(e)}>Submit</button>
      </form>
    </>
  );
};

export default EditProject;