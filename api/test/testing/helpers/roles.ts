import model from "../../../src/data-access/models";

const createRoles = async () => {
  await model.Role.create({
    name: "owner",
  });

  await model.Role.create({
    name: "employee",
  });
};

export default {
  createRoles,
};
