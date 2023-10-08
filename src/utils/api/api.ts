import employeeData from "../../data/dummy-employee-data";
import projectData from "../../data/dummy-project-data";
import EmployeeType from "../../types/employeeType";
import ProjectType from "../../types/projectType";
import RequestResponseType from "../../types/requestResponseType";

export const getEmployees = (): EmployeeType[] => {
  return employeeData;
};

export const addEmployee = (data: EmployeeType): RequestResponseType => {

  employeeData.push(data);

  return { code: "success", message: "Employee successfully added."}
}

export const getProjects = (): ProjectType[] => {
  return projectData;
};

export const addProject = (data: ProjectType): RequestResponseType => {

  projectData.push(data);

  return { code: "success", message: "Project successfully added."}
}