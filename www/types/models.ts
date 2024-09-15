export interface IUser {
  id: number;
  name: string;
  email: string;
  bio: string;
  avatar: string;
  memberships: IMember[];
}
export interface IWorkspace {
  id: number;
  name: string;
  description: string;
  visibility: "Public" | "Private";
  members?: IMember[];
  boards?: IBoard[];
  avatar: string;
}
export interface IBoard {
  id: number;
  workspaceId: number;
  name: string;
  description: string;
  visibility: "Public" | "Private";
  members?: IMember[];
  statuses?: IStatus[];
  pinned: boolean;
}
export interface IMember {
  id: number;
  userId: number;
  resourceId: number;
  resourceType: string;
  profile: IUser;
  permissions: string[];
  role: string;
}
export interface IStatus {
  id: number;
  name: string;
  pos: number;
  cards?: ICard[];
  boardId: number;
}
export interface ICard {
  id: number;
  name: string;
  description: string;
  assignee: IUser;
  priority: string;
  deadline: string;
  statusId: number;
  activities: IActivity[];
  participants: IUser[];
  updatedAt: string;
}
export interface INotification {
  id: number;
  type: string;
  title: string;
  description: string;
  link: string;
  isRead: boolean;
  date: string;
}
export interface IInvitation {
  id: number;
  related: IWorkspace | IBoard;
  relatedType: string;
  token: string;
  invitedEmail: string;
  role: string;
  message: string;
  invitedBy: IUser;
  invited: IUser;
  expiresAt: string;
}
export interface IActivity {
  id: number;
  type: string;
  description: string;
  createdAt: string;
  causer: IUser;
}
