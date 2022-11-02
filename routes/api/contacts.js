const express = require("express");

const {
  validation,
  ctrlWrapper,
  isValidId,
  authToken,
} = require("../../middlewares");
const { joiSchema, statusJoiSchema } = require("../../models/contact");
const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", authToken, ctrlWrapper(ctrl.getAll));

router.get("/:contactId", authToken, isValidId, ctrlWrapper(ctrl.getById));

router.post("/", authToken, validation(joiSchema), ctrlWrapper(ctrl.add));

router.delete(
  "/:contactId",
  authToken,
  validation(joiSchema),
  ctrlWrapper(ctrl.removeById)
);

router.put("/:contactId", isValidId, ctrlWrapper(ctrl.updateById));
router.patch(
  "/:contactId/favorite",
  authToken,
  validation(statusJoiSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;
