const joi = require("joi");

// define schema for joi validation

// for adding users page

const addUser = {
  firstName: joi
    .string()
    .required()
    .min(1)
    .max(50)
    .pattern(/^[A-Za-z\s'-]+$/)
    .trim()
    .normalize()
    .lowercase()
    .messages({
      "string.empty": "first name is required",
      "string.min": "first name should have a minimum length of 1",
      "string.max": "first name should have a maximum length of 50",
      "string.pattern.base":
        "first name can only contain letters, spaces, hyphens, and apostrophes",
    }),

  lastName: joi
    .string()
    .required()
    .min(1)
    .max(50)
    .pattern(/^[A-Za-z\s'-]+$/)
    .trim()
    .normalize()
    .lowercase()
    .messages({
      "string.empty": "last name is required",
      "string.min": "last name should have a minimum length of 1",
      "string.max": "last name should have a maximum length of 50",
      "string.pattern.base":
        "last name can only contain letters, spaces, hyphens, and apostrophes",
    }),

  number: joi
    .string()
    .pattern(
      /^(((\+44\d{4}|\(?0\d{4}\)?)\d{3}\d{3})|((\+44\d{3}|\(?0\d{3}\)?)\d{3}\d{4})|((\+44\d{2}|\(?0\d{2}\)?)\d{4}\d{4}))/
    )
    .required()
    .messages({
      "string.empty": "phone number is required",
      "string.pattern.base": "phone number must be a valid UK phone number",
    }),

  email: joi
    .string()
    .required()
    .email({ tlds: { allow: false } })
    .messages({
      "string.empty": "email is required",
      "string.email": "email must be a valid email address",
    }),

  dob: joi
    .string()
    .pattern(/^(\d{2})\/(\d{2})\/(\d{4})$/)
    .required()
    .custom((value, helpers) => {
      // split date into array [dd, mm, yyyy]
      const [day, month, year] = value.split("/").map(Number);

      // verify month and day values
      if (month < 1 || month > 12) {
        return helpers.error("date.invalid.month");
      }

      // check if the day is valid for the month, accounting for leap years
      if (day < 1 || day > new Date(year, month, 0).getDate()) {
        return helpers.error("date.invalid.day");
      }

      // check year
      if (year < 1900 || year > new Date().getFullYear()) {
        return helpers.error("date.invalid.year");
      }

      // calculate age
      const currentDate = new Date();
      const birthDate = new Date(value);
      let age = currentDate - birthDate;

      age = Math.floor(age / (1000 * 60 * 60 * 24 * 365.25));

      if (age < 18) {
        return helpers.error("any.custom");
      }

      return value;
    })
    .messages({
      "string.empty": "date of birth is required",
      "string.pattern.base": "date of birth must be in the format dd/mm/yyyy",
      "any.custom": "age must be at least 18 years old",
      "date.invalid.day": "date of birth contains an invalid day",
      "date.invalid.month": "date of birth contains an invalid month",
      "date.invalid.year": "date of birth contains an invalid year",
    }),

  password: joi
    .string()
    .required()
    .min(8)
    .max(32)
    .trim()
    .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*/)
    .messages({
      "string.empty": "password is required",
      "string.min":
        "password must have a minimum length of {#limit} characters",
      "string.max":
        "password must have a maximum length of {#limit} characters",
      "string.pattern.base":
        "password must contain an uppercase letter, a lowercase letter, and a number",
    }),
};

// for updating user info

const updateUser = {
  firstName: joi
    .string()
    .min(1)
    .max(50)
    .pattern(/^[A-Za-z\s'-]+$/)
    .trim()
    .normalize()
    .lowercase()
    .messages({
      "string.empty": "first name is required",
      "string.min": "first name should have a minimum length of 1",
      "string.max": "first name should have a maximum length of 50",
      "string.pattern.base":
        "first name can only contain letters, spaces, hyphens, and apostrophes",
    }),

  lastName: joi
    .string()
    .min(1)
    .max(50)
    .pattern(/^[A-Za-z\s'-]+$/)
    .trim()
    .normalize()
    .lowercase()
    .messages({
      "string.empty": "last name is required",
      "string.min": "last name should have a minimum length of 1",
      "string.max": "last name should have a maximum length of 50",
      "string.pattern.base":
        "last name can only contain letters, spaces, hyphens, and apostrophes",
    }),

  number: joi
    .string()
    .pattern(
      /^(((\+44\d{4}|\(?0\d{4}\)?)\d{3}\d{3})|((\+44\d{3}|\(?0\d{3}\)?)\d{3}\d{4})|((\+44\d{2}|\(?0\d{2}\)?)\d{4}\d{4}))/
    )
    .messages({
      "string.empty": "phone number is required",
      "string.pattern.base": "phone number must be a valid UK phone number",
    }),

  email: joi
    .string()
    .email({ tlds: { allow: false } })
    .messages({
      "string.empty": "email is required",
      "string.email": "email must be a valid email address",
    }),

  dob: joi
    .string()
    .pattern(/^(\d{2})\/(\d{2})\/(\d{4})$/)
    .required()
    .custom((value, helpers) => {
      // split date into array [dd, mm, yyyy]
      const [day, month, year] = value.split("/").map(Number);

      // verify month and day values
      if (month < 1 || month > 12) {
        return helpers.error("date.invalid.month");
      }

      // check if the day is valid for the month, accounting for leap years
      if (day < 1 || day > new Date(year, month, 0).getDate()) {
        return helpers.error("date.invalid.day");
      }

      // check year
      if (year < 1900 || year > new Date().getFullYear()) {
        return helpers.error("date.invalid.year");
      }

      // calculate age
      const currentDate = new Date();
      const birthDate = new Date(value);
      let age = currentDate - birthDate;

      age = Math.floor(age / (1000 * 60 * 60 * 24 * 365.25));

      if (age < 18) {
        return helpers.error("any.custom");
      }

      return value;
    })
    .messages({
      "string.empty": "date of birth is required",
      "string.pattern.base": "date of birth must be in the format dd/mm/yyyy",
      "any.custom": "age must be at least 18 years old",
      "date.invalid.day": "date of birth contains an invalid day",
      "date.invalid.month": "date of birth contains an invalid month",
      "date.invalid.year": "date of birth contains an invalid year",
    }),

  password: joi
    .string()
    .min(8)
    .max(32)
    .trim()
    .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*/)
    .messages({
      "string.empty": "password is required",
      "string.min":
        "password must have a minimum length of {#limit} characters",
      "string.max":
        "password must have a maximum length of {#limit} characters",
      "string.pattern.base":
        "password must contain an uppercase letter, a lowercase letter, and a number",
    }),
};

module.exports = { addUser, updateUser };

// FOR LATER USE:

// for login page

// export const login = {
//   email: joi
//     .string()
//     .required()
//     .email({ tlds: { allow: false } })
//     .messages({
//       "string.empty": "email is required",
//       "string.email": "email must be a valid email address",
//     }),

//   password: joi.string().min(8).max(32).trim().messages({
//     "string.empty": "password is required",
//     "string.min": "password must have a minimum length of {#limit} characters",
//     "string.max": "password must have a maximum length of {#limit} characters",
//   }),
// };

// // for payment page

// export const pay = {
//   payeeName: joi
//     .string()
//     .required()
//     .min(1)
//     .max(70)
//     .pattern(/^[A-Za-z\s'-]+$/)
//     .trim()
//     .normalize()
//     .lowercase()
//     .messages({
//       "string.empty": "payee name is required",
//       "string.min": "payee name should have a minimum length of 1",
//       "string.max": "payee n1ame should have a maximum length of 70",
//       "string.pattern.base":
//         "payee name can only contain letters, spaces, hyphens, and apostrophes",
//     }),

//   sortCode: joi
//     .string()
//     .pattern(/^(\d{2}-?)?(\d{2}-?)?\d{2}$/)
//     .required()
//     .min(6)
//     .max(8)
//     .messages({
//       "string.empty": "sort code is required",
//       "string.pattern.base": "sort code must be a valid UK sort code",
//     }),

//   accountNumber: joi
//     .string()
//     .pattern(/^\d{8}$/)
//     .required()
//     .length(8)
//     .messages({
//       "string.empty": "bank account number is required",
//       "string.pattern.base": "bank account number must be 8 digits",
//     }),

//   paymentAmount: joi
//     .string()
//     .required()
//     .pattern(/^\d+(\.\d{1,2})?$/) // Allows positive decimal numbers with up to 2 decimal places
//     .messages({
//       "string.empty": "amount is required",
//       "string.pattern.base":
//         "amount must be a valid decimal number with up to 2 decimal places",
//     }),
// };

// // for debit card validation

// export const debit = {
//   cardNumber: joi.string().creditCard().required().messages({
//     "string.empty": "debit card number is required",
//     "string.creditCard": "debit card number must be a valid debit card number",
//   }),

//   expiryDate: joi
//     .string()
//     .pattern(/^\d{2}\/\d{2}$/)
//     .required()
//     .messages({
//       "string.empty": "debit card expiry date is required",
//       "string.pattern.base":
//         "debit card expiry date must be in the format MM/YY",
//     }),

//   CVV: joi
//     .string()
//     .pattern(/^\d{3}$/)
//     .required()
//     .messages({
//       "string.empty": "debit card CVV is required",
//       "string.pattern.base": "debit card CVV must be a 3-digit number",
//     }),
// };

// // for password change

// export const passwordChange = {
//   currentPassword: joi.string().min(8).max(32).trim().messages({
//     "string.empty": "password is required",
//     "string.min": "password must have a minimum length of {#limit} characters",
//     "string.max": "password must have a maximum length of {#limit} characters",
//   }),

//   newPassword: joi
//     .string()
//     .min(8)
//     .max(32)
//     .trim()
//     .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*/)
//     .messages({
//       "string.empty": "password is required",
//       "string.min":
//         "password must have a minimum length of {#limit} characters",
//       "string.max":
//         "password must have a maximum length of {#limit} characters",
//       "string.pattern.base":
//         "password must contain an uppercase letter, a lowercase letter, and a number",
//     }),

//   confirmNewPassword: joi.string().valid(joi.ref("newPassword")).messages({
//     "any.only": "passwords do not match",
//     "string.empty": "is not allowed to be empty",
//   }),
// };
