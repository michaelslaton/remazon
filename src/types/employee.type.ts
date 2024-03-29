type EmployeeType = {
  id: number;
  name: string;
  birthday?: Date | null;
  rank: number;
  description: string;
  cupcakes: number;
  quote: null | string;
  aliases: string;
  locked: boolean;
  uid: string;
  admin: boolean;
};

export type EmployeePostType = {
  name: string;
  birthday?: Date | null;
  uid: string;
  aliases?: string;
  description: string;
};

export default EmployeeType;