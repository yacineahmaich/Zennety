declare namespace App.Models {
  interface User {
    id: number;
    name: string;
    email: string;
    bio: string;
    avatar: string;
    memberships: Member[];
  }
  interface Workspace {
    id: number;
    name: string;
    description: string;
    visibility: "Public" | "Private";
    members?: Member[];
    boards?: Board[];
    avatar: string;
  }
  interface Board {
    id: number;
    workspaceId: number;
    name: string;
    description: string;
    visibility: "Public" | "Private";
    members?: Member[];
    statuses?: Status[];
    pinned: boolean;
  }
  interface Member {
    id: number;
    userId: number;
    resourceId: number;
    resourceType: string;
    profile: User;
    permissions: string[];
    role: string;
  }
  interface Status {
    id: number;
    name: string;
    pos: number;
    cards?: Card[];
    boardId: number;
  }
  interface Card {
    id: number;
    name: string;
    description: string;
    statusId: number;
    activities: Activity[];
    participants: User[];
    updatedAt: string;
  }
  interface Notification {
    id: number;
    type: string;
    title: string;
    description: string;
    link: string;
    isRead: boolean;
    date: string;
  }
  interface Invitation {
    id: number;
    related: Workspace | Board;
    relatedType: string;
    token: string;
    invitedEmail: string;
    role: string;
    message: string;
    invitedBy?: User;
    invited?: User;
    expiresAt: string;
  }
  interface Activity<T extends Record<string, unknown>> {
    id: number;
    description: string;
    created_at: string;
    properties: T;
    causer: User;
  }
}
