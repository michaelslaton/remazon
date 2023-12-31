import EmployeeType from './employeeType';

type ProjectType = {
  id: number;
  name: string;
  host: number;
  attending?: EmployeeType[];
  type: string;
  description: string;
  locked: boolean;
  status: boolean;
};

export type ProjectPostType = {
  name: string;
  host: number;
  type: string;
  description: string;
};

export default ProjectType;