type EmployeeType = {
  id: number;
  name: string;
  employeeAssigned: number | null;
  birthday?: Date | null;
  rank: number;
  description: string;
  status: boolean;
};

export type EmployeePostType = {
  name: string;
  rank: number;
  birthday?: Date | null;
  description: string;
};

export default EmployeeType;