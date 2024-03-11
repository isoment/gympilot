import model from "../../../src/data-access/models";

const createProgramTemplates = async () => {
  await model.Template.create({
    name: "personal-training",
  });

  await model.Template.create({
    name: "cardio",
  });

  await model.Template.create({
    name: "gymnastics",
  });
};

export { createProgramTemplates };
