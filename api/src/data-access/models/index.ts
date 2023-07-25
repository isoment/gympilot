import User from "./user";
import Role from "./role";
import UserRoles from "./userRoles";

/*********************************************************
 *  Here we can define the relationships between models  *
 ********************************************************/
User.belongsToMany(Role, { through: UserRoles, foreignKey: "user_id" });
Role.belongsToMany(User, { through: UserRoles, foreignKey: "role_id" });

export default {
  User,
  Role,
  UserRoles,
};
