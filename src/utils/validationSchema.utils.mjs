export const userValidationSchema = {
  username: {
    isLength: {
      errorMessage: "Username should be at least 3 chars long",
      options: { min: 3, max: 32 },
    },
    notEmpty: {
      errorMessage: "Username cannot be empty",
    },
    isString: {
      errorMessage: "Username must be a string",
    },
  },
  email: {
    isLength: {
      errorMessage: "Email should be at least 3 chars long",
      options: { min: 3, max: 32 },
    },
    notEmpty: {
      errorMessage: "Email cannot be empty",
    },
    isString: {
      errorMessage: "Email must be a string",
    },
  },
};

export const queryValidationSchema = {
  filter: {
    in: ["query"],
    optional: true,
    isString: {
      errorMessage: "Filter must be a string",
    },
    notEmpty: {
      errorMessage: "Filter cannot be empty",
    },
    isLength: {
      errorMessage: "Filter should be at least 3 chars long",
      options: { min: 3, max: 10 },
    },
  },
  value: {
    in: ["query"],
    optional: true,
    isString: {
      errorMessage: "Value must be a string",
    },
    notEmpty: {
      errorMessage: "Value cannot be empty",
    },
    isLength: {
      errorMessage: "Value should be at least 3 chars long",
      options: { min: 3, max: 10 },
    },
  },
};
