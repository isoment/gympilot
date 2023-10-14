import { LoadUser } from "@/api/types";

export interface Toast {
  id?: string;
  type: string;
  message: string;
}

export interface GlobalState {
  isLoggedIn: boolean;
  user: Partial<LoadUser>;
  accessToken: string | null;
  toasts: Toast[];
}
