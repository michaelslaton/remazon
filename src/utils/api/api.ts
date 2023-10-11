import employeeData from "../../data/dummy-employee-data";
import projectData from "../../data/dummy-project-data";
import EmployeeType from "../../types/employeeType";
import ProjectType from "../../types/projectType";
import RequestResponseType from "../../types/requestResponseType";

const API_URL = "http://localhost:5001/remazon";
const headers = new Headers();
headers.append("Content-Type", "application/json");

const useFetch = async (url: string, controller: AbortController) => {
  try{
    const response = await fetch(url, {signal: controller.signal});
    if (response.status === 204) return null;
    const payload = await response.json();
    return await payload.data;
  } catch (e) {
    console.error(e);
  }
};

export const getEmployees = (): EmployeeType[] => {
  return employeeData;
};

export const addEmployee = (data: EmployeeType): RequestResponseType => {
  employeeData.push(data);
  return { code: "success", message: "Employee successfully added."}
}

export const getProjects = async (abortController: AbortController) => {
  return await useFetch(`${API_URL}/projects`, abortController);
};

export const addProject = (data: ProjectType): RequestResponseType => {

  projectData.push(data);

  return { code: "success", message: "Project successfully added."}
}