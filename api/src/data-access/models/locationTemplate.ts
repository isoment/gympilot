import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { database } from "./database";
import templateModel from "./template";
import locationModel from "./location";

export interface LocationTemplateFields extends Model<InferAttributes<LocationTemplateFields>, InferCreationAttributes<LocationTemplateFields>> {
  id: CreationOptional<number>;
  location_id: number;
  template_id: number;
  created_at: CreationOptional<Date>;
  updated_at: CreationOptional<Date>;
}

const LocationTemplate = database.get().define<LocationTemplateFields>(
  "LocationTemplate",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    location_id: {
      type: DataTypes.BIGINT,
      references: {
        model: locationModel,
        key: "id",
      },
    },
    template_id: {
      type: DataTypes.BIGINT,
      references: {
        model: templateModel,
        key: "id",
      },
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: "created_at",
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: "updated_at",
    },
  },
  { tableName: "location_templates", createdAt: "created_at", updatedAt: "updated_at" },
);

export default LocationTemplate;
