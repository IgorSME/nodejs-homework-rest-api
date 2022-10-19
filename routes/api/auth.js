const express = require("express");

const { validation, ctrlWrapper, authToken } = require("../../middlewares");
const { auth: ctrl } = require("../../controllers");
const { joiSchema, joiSchemaSubscription } = require("../../models/user");

const router = express.Router();

router.post("/register", validation(joiSchema), ctrlWrapper(ctrl.register));
router.post("/login", validation(joiSchema), ctrlWrapper(ctrl.login));
router.get("/current", authToken, ctrlWrapper(ctrl.getCurrent));
router.post("/logout", authToken, ctrlWrapper(ctrl.logout));
router.patch(
  "/",
  authToken,
  validation(joiSchemaSubscription),
  ctrlWrapper(ctrl.updateSubscription)
);

module.exports = router;
