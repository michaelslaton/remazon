type EmployeeType = {
  id: number;
  name: string;
  birthday?: Date | null;
  rank: number;
  description: string;
  status: boolean;
};

export type EmployeePostType = {
  name: string;
  rank: number;
  description: string;
};

export default EmployeeType;