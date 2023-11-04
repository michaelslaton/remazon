import EmployeeType from "./employeeType";

type ProjectType = {
  id: number;
  name: string;
  host: string;
  hostId: number;
  attending?: EmployeeType[];
  type: string;
  description: string;
  status: boolean;
};

export type ProjectPostType = {
  name: string;
  host: number;
  type: string;
  description: string;
};

export default ProjectType;