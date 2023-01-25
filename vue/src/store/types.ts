import { LoadUser } from "@/api/types";

export interface GlobalState {
  isLoggedIn: boolean;
  user: Partial<LoadUser>;
}
