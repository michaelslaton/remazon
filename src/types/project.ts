import Employee from "./employee";

type Project = {
  name: string;
  host: number;
  attending?: Employee[];
  type: string;
  description: string;
};

export default Project;