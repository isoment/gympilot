import bcrypt from "bcrypt";
import * as userRepository from "../../../src/data-access/repositories/userRepository";

const createUser = async (params = {}, password = "password123", roles: string[] = ["owner"]) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await userRepository.createUserWithRole(
    {
      first_name: "Dudly",
      last_name: "Dingleberry",
      email: "dudley@dingleberry.com",
      password: hashedPassword,
      ...params,
    },
    roles,
  );

  return user;
};

export default {
  createUser,
};
