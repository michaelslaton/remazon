type NotificationType = {
  id: number;
  type: string;
  users: string;
  title: string;
  message: string;
};

export type NotificationPostType = {
  type: string;
  title: string;
  users: string;
  message: string;
};

export default NotificationType;