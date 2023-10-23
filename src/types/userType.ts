type UserType = {
  id: number;
  name: string;
  uid: string;
  employeeNumber: number | null;
  admin: boolean;
};

export type UserPostType = {
  name: string;
  uid: string;
  employeeNumber: number | null;
}

export default UserType;