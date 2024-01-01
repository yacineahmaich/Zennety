declare namespace App.Models {
  interface User {
    id: number;
    name: string;
    email: string;
  }
  interface Workspace {
    id: number;
    name: string;
    description: string;
    visibility: "Public" | "Private";
    members?: Member[];
    boards?: Board[];
  }
  interface Board {
    id: number;
    workspaceId: number;
    name: string;
    description: string;
    visibility: "Public" | "Private";
    members?: Member[];
    statuses?: Status[];
  }
  interface Member {
    id: number;
    name: string;
    email: string;
    permissions: string[];
    role: string;
  }
  interface Status {
    id: number;
    name: string;
  }
  interface Notification {
    id: number;
    type: string;
    title: string;
    description: string;
    link: string;
    isRead: boolean;
  }
  interface Invitation {
    id: number;
    related: Workspace | Board;
    relatedType: "App\\Models\\Workspace" | "App\\Models\\Board";
    token: string;
    invitedEmail: string;
    message: string;
    invitedBy: User;
    expiresAt: string;
  }
}
