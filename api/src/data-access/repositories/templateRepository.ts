import { WhereOptions, InferAttributes, Model } from "sequelize";
import model from "../models";
import { TemplateFields } from "../models/template";

export async function getTemplate<T extends keyof TemplateFields>(field: T, value: TemplateFields[T]): Promise<TemplateFields | null> {
  const whereClause: WhereOptions<InferAttributes<TemplateFields>> = { [field]: value };
  return await model.Template.findOne({
    where: whereClause,
  });
}
