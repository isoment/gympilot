import { UserState } from "@/api/types";

export interface Toast {
  id?: string;
  type: string;
  message: string;
}

export interface GlobalState {
  isLoggedIn: boolean;
  user: Partial<UserState>;
  accessToken: string | null;
  toasts: Toast[];
  sessionExpiredLastRoute: string | null;
}
