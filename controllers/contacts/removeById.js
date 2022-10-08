const contactsOperations = require("../../models/contacts");
const { NotFound } = require("http-errors");

const removeById = async (req, res) => {
 
    const { contactId } = req.params;
    const contacts = await contactsOperations.removeContact(contactId);
    if (!contacts) {
        throw new NotFound(`Product with id=${contactId} not found`);
    }
    res.json({
        status: "success",
        code: 200,
        message: "contact deleted",
        data: {
            contacts,
        },
    });
}

module.exports = removeById;
