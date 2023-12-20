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
}
