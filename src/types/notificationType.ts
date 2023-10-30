type NotificationType = {
  id: number;
  type: string;
  user: number;
  requestedEmployee: number;
  message: string | null;
};

export type NotificationPostType = {
  type: string;
  user: number;
  requestedEmployee: number;
  message?: string;
};

export default NotificationType;