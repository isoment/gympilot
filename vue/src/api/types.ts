export interface UserState {
  id: number;
  iat?: number;
  exp?: number;
  name: string;
  onboarding_complete: boolean | null;
  roles: string[];
}
