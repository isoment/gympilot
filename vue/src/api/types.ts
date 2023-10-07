interface Role {
  name: string;
  created_at?: string;
}

export interface LoadUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
  updated_at: string;
  Roles: Role[];
}
