const express = require("express");

const { validation, ctrlWrapper } = require("../../middlewares");
const { contactsSchemas } = require("../../schemas");
const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post("/", validation(contactsSchemas), ctrlWrapper(ctrl.add));

router.delete(
  "/:contactId",
  validation(contactsSchemas),
  ctrlWrapper(ctrl.removeById)
);

router.put("/:contactId", ctrlWrapper(ctrl.updateById));

module.exports = router;
