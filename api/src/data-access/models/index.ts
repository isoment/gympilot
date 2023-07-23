import userModel from "./userModel";
import roleModel from "./roleModel";
import userRolesModel from "./userRolesModel";

/*********************************************************
 *  Here we can define the relationships between models  *
 ********************************************************/
userModel.belongsToMany(roleModel, { through: userRolesModel, foreignKey: "user_id" });
roleModel.belongsToMany(userModel, { through: userRolesModel, foreignKey: "role_id" });

export default {
  userModel,
  roleModel,
  userRolesModel,
};
