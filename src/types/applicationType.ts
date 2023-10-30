type ApplicationType = {
  id: number;
  type: string;
  user: number;
  requestedEmployee: number;
  message: string | null;
};

export type ApplicationPostType = {
  type: string;
  user: number;
  requestedEmployee: number;
  message?: string;
};

export default ApplicationType;