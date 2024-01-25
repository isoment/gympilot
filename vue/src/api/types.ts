export interface UserState {
  id: number;
  iat?: number;
  exp?: number;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
  updated_at: string;
  roles: string[];
}
