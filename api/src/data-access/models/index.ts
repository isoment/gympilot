import User from "./user";
import Role from "./role";
import UserRole from "./userRole";
import PasswordReset from "./passwordReset";
import Organization from "./organization";
import Location from "./location";
import UserLocation from "./userLocation";
import Template from "./template";
import LocationTemplate from "./locationTemplate";
import ProductTier from "./productTier";
import ProductTierSubscription from "./productTierSubscription";

/*********************************************************
 *  Here we can define the relationships between models  *
 ********************************************************/
User.belongsToMany(Role, { through: UserRole, foreignKey: "user_id" });
User.hasOne(Organization, { foreignKey: "owner_id" });
User.belongsToMany(Location, { through: UserLocation, foreignKey: "user_id" });

Role.belongsToMany(User, { through: UserRole, foreignKey: "role_id" });

Organization.belongsTo(User, { foreignKey: "owner_id" });
Organization.hasMany(Location, { foreignKey: "organization_id" });
Organization.hasMany(ProductTierSubscription, { foreignKey: "organization_id" });

Location.belongsTo(Organization, { foreignKey: "organization_id" });
Location.belongsToMany(User, { through: UserLocation, foreignKey: "location_id" });
Location.belongsToMany(Template, { through: LocationTemplate, foreignKey: "location_id" });

Template.belongsToMany(Location, { through: LocationTemplate, foreignKey: "template_id" });

ProductTier.hasMany(ProductTierSubscription, { foreignKey: "product_tier_id" });

ProductTierSubscription.belongsTo(Organization, { foreignKey: "organization_id" });
ProductTierSubscription.belongsTo(ProductTier, { foreignKey: "product_tier_id" });

export default {
  User,
  Role,
  UserRole,
  PasswordReset,
  Organization,
  Location,
  UserLocation,
  Template,
  LocationTemplate,
  ProductTier,
};
