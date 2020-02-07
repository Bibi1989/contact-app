"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const auth_1 = require("../users/auth");
const contact_connect_1 = require("../../model/contact-connect");
router.patch('/:updateID', auth_1.Auth, async (req, res) => {
    try {
        const { updateID } = req.params;
        console.log(updateID);
        const { first_name, last_name, email, phone, company } = req.body;
        const [row] = await contact_connect_1.db.query(contact_connect_1.sql `UPDATE contacts SET first_name=${first_name}, last_name=${last_name}, email=${email}, phone=${phone}, company=${company} WHERE id = ${updateID}`);
        return res.status(200).json({
            data: row
        });
    }
    catch (error) {
        res.status(404).json({ error: error });
    }
});
exports.default = router;
//# sourceMappingURL=updateContact.js.map