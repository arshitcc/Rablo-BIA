import { Router } from "express";
import {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getFeaturedProducts,
  getProductsByPrice,
  getProductsByRating,
} from "../controllers/product.controllers";
import {
  authenticateUser,
  verifyPermission,
} from "../middlewares/auth.middleware";
import {
  addProductValidation,
  updateProductValidation,
} from "../validators/product.validators";
import { validate } from "../middlewares/validator.middleware";
import { UserRolesEnum } from "../constants/constants";
import { mongoIdPathVariableValidator } from "../validators/common/mongodb/mongodb.validators";

const router = Router();

router
  .post(
    "/",
    authenticateUser,
    verifyPermission([UserRolesEnum.ADMIN]),
    addProductValidation(),
    validate,
    addProduct,
  )
  .get(
    "/",
    authenticateUser,
    verifyPermission([UserRolesEnum.ADMIN, UserRolesEnum.USER]),
    getAllProducts,
  );

router
  .put(
    "/:productId",
    authenticateUser,
    verifyPermission([UserRolesEnum.ADMIN]),
    mongoIdPathVariableValidator("productId"),
    updateProductValidation(),
    validate,
    updateProduct,
  )
  .delete(
    "/:productId",
    authenticateUser,
    mongoIdPathVariableValidator("productId"),
    deleteProduct,
  );

router.get(
  "/featured",
  authenticateUser,
  verifyPermission([UserRolesEnum.ADMIN, UserRolesEnum.USER]),
  getFeaturedProducts,
);
router.get(
  "/price",
  authenticateUser,
  verifyPermission([UserRolesEnum.ADMIN, UserRolesEnum.USER]),
  getProductsByPrice,
);
router.get(
  "/rating",
  authenticateUser,
  verifyPermission([UserRolesEnum.ADMIN, UserRolesEnum.USER]),
  getProductsByRating,
);

export default router;
