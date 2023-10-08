import employeeData from "../../data/dummy-employee-data";
import projectData from "../../data/dummy-project-data";
import Employee from "../../types/employee";
import Project from "../../types/project";

export const getEmployees = (): Employee[] => {
  return employeeData;
};

export const getProjects = (): Project[] => {
  return projectData;
};