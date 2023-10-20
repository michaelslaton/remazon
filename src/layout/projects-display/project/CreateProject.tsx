import { useRef } from "react";
import { useAppDispatch } from "../../../redux/hooks";
import { ProjectPostType } from "../../../types/projectType";
import { createProjectThunk } from "../../../redux/slices/projectsSlice";
import "../projects.css";

const CreateProject: React.FC = () => {
  const dispatch = useAppDispatch();
  const nameRef = useRef<HTMLInputElement>(null);
  const hostRef = useRef<HTMLSelectElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const submitHandler: Function = (e: React.FormEvent): void => {
    e.preventDefault();
    const newProject: ProjectPostType = {
      name: nameRef.current!.value,
      host: Number(hostRef.current!.value),
      type:typeRef.current!.value,
      description: descriptionRef.current!.value,
    };

    dispatch(createProjectThunk(newProject));

    return
  };

  return (
    <>
      <h2 className="title">Create Project</h2>
      <form>

        <label>
          Name:
          <input
            type="text"
            id="name"
            name="name"
            ref={nameRef}/>
        </label>

        <label>
          Host:
          <select
            id="host"
            name="host"
            ref={hostRef}>
            <option value="0">Eh ??</option>
          </select>
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

        <button type="submit" onClick={(e)=> submitHandler(e)}>Submit</button>
      </form>
    </>
  );
};

export default CreateProject;