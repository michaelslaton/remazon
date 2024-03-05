type AwardType = {
  id: number;
  name: string;
  type: string;
  holder: number | null;
  date: Date;
  awardedFor?: string;
  retired: boolean;
};

export type AwardPostType = {
  name: string;
  type?: string;
  holder?: number | null;
  date: Date;
  awardedFor?: string;
  retired?: boolean;
};

export default AwardType;