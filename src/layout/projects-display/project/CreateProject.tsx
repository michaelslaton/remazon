import { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import ProjectType from "../../../types/projectType";
import { addProject, getProjects } from "../../../utils/api/api";
import "./project.css";
import { setProjects } from "../../../redux/slices/projectsSlice";

const CreateProject: React.FC = () => {
  const projects = useAppSelector((state)=> state.projectsControl.projects);
  const dispatch = useAppDispatch();
  const nameRef = useRef<HTMLInputElement>(null);
  const hostRef = useRef<HTMLSelectElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const submitHandler: Function = (e: React.FormEvent): void => {
    e.preventDefault();


    const data: ProjectType = {
      id: projects[projects.length - 1].id + 1,
      name: nameRef.current!.value,
      host: Number(hostRef.current!.value),
      type: typeRef.current!.value,
      description: descriptionRef.current!.value,
    };

    addProject(data);

    const updatedData = getProjects(); // <-- adjust later
    dispatch(setProjects(updatedData)); // <-- adjust later
    return
  }

  return (
    <>
      <form>
        <label>
          Name:
          <input type="text" ref={nameRef}/>
        </label>
        <label>
          Host:
          <select id="host" name="host" ref={hostRef}>
            <option value="0">Eh ??</option>
          </select>
        </label>
        <label>
          Type:
          <select id="type" name="type" ref={typeRef}>
            <option value="string">Eh ??</option>
          </select>
        </label>
        <label>
          Description:
          <textarea id="description" name="description" ref={descriptionRef}/>
        </label>
        <button type="submit" onClick={(e)=> submitHandler(e)}>Submit</button>
      </form>
    </>
  );
};

export default CreateProject;