import { body } from "express-validator";

const addProductValidation = () => {
  return [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Product Name is required")
      .isLength({
        min: 2,
        max: 100,
      }),
    body("price")
      .trim()
      .notEmpty()
      .withMessage("Product Price is required")
      .isNumeric()
      .withMessage("Product Price must be a number"),
    body("company")
      .trim()
      .notEmpty()
      .withMessage("Product Company is required")
      .isLength({
        min: 2,
        max: 100,
      }),
  ];
};

const updateProductValidation = () => {
  return [
    body("name")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Name is required")
      .isLength({
        min: 2,
        max: 100,
      }),
    body("price")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Price is required")
      .isNumeric()
      .withMessage("Product Price must be a number"),
    body("company")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Company is required")
      .isLength({
        min: 2,
        max: 100,
      }),
    body("isFeatured")
      .optional()
      .isBoolean()
      .withMessage("isFeatured must be a boolean"),
  ];
};

export { addProductValidation, updateProductValidation };
