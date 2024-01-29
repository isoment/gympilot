import { UserState } from "@/api/types";

const createUserObject = (params: Partial<UserState> = {}) => {
  return {
    id: 1,
    first_name: "Test",
    last_name: "User",
    email: "user@test.com",
    roles: ["owner"],
    created_at: "2020-01-01T24:59:59.000Z",
    updated_at: "2020-01-01T24:59:59.000Z",
    ...params,
  };
};

export { createUserObject };
