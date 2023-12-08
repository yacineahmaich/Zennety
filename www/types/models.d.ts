declare namespace App.Models {
  interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string | null;
    updated_at: string | null;
  }
  interface Workspace {
    id: number;
    name: string;
    description: string;
    visibility: "Public" | "Private";
    members?: Member[];
  }
  interface Member {
    id: number;
    name: string;
    email: string;
    permissions: string[];
    role: string;
  }
}
