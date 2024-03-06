import User from "./user";
import Role from "./role";
import UserRole from "./userRole";
import PasswordReset from "./passwordReset";

/*********************************************************
 *  Here we can define the relationships between models  *
 ********************************************************/
User.belongsToMany(Role, { through: UserRole, foreignKey: "user_id" });
Role.belongsToMany(User, { through: UserRole, foreignKey: "role_id" });

export default {
  User,
  Role,
  UserRole,
  PasswordReset,
};
