type ProjectType = {
  id: number;
  name: string;
  host: number;
  attending?: string;
  date: Date;
  type: string;
  description: string;
  locked: boolean;
  status: boolean;
};

export type ProjectPostType = {
  name: string;
  host: number;
  type: string;
  date: Date;
  attending?: string;
  description: string;
};

export default ProjectType;