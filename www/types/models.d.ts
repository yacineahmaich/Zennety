declare namespace App.Models {
  export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string | null;
    updated_at: string | null;
  }
  export interface Workspace {
    id: number;
    name: string;
    description: string;
    visibility: "Public" | "Private";
  }
}
