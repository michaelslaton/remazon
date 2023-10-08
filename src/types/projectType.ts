import EmployeeType from "./employeeType";

type ProjectType = {
  id: number;
  name: string;
  host: number;
  attending?: EmployeeType[];
  type: string;
  description: string;
};

export default ProjectType;