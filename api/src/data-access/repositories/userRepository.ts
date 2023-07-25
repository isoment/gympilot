import model from "../models";

type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
};

export async function getUser(id: number): Promise<User | null> {
  const user = await model.User.findOne({
    where: { id },
    attributes: { exclude: ["password"] },
    nest: true,
  });
  return user;
}
