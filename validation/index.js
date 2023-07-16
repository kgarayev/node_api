const joi = require("joi");
const { addUser, updateUser } = require("./schema");

// main joi validation functions

const validate = async (payload, type) => {
  let option;

  switch (type) {
    case "addUser":
      // call joi
      option = joi.object(addUser);
      break;

    case "updateUser":
      // call joi
      option = joi.object(updateUser);
      break;

    default:
      break;
  }

  try {
    const results = await option.validateAsync(payload, { abortEarly: false });
    return null;
  } catch (errors) {
    const errorsModified = {};
    errors.details.forEach((error) => {
      errorsModified[error.context.key] = error.message;
    });

    return errorsModified;
  }
};

module.exports = { validate };
