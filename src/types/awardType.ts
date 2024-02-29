type AwardType = {
  id: number;
  name: string;
  type: string;
  holder: number;
  retired: boolean;
};

export type AwardPostType = {
  name: string;
  type?: string;
  holder?: number | null;
  retired?: boolean;
};

export default AwardType;