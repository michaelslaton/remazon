type EmployeeType = {
  id: number;
  name: string;
  birthday?: Date;
  rank: number;
  description: string;
};

export type EmployeePostType = {
  name: string;
  birthday?: Date;
  rank: number;
  description: string;
};

export default EmployeeType;