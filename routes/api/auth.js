const express = require("express");

const {
  validation,
  ctrlWrapper,
  authToken,
  upload,
} = require("../../middlewares");
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
router.patch(
  "/avatars",
  authToken,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
