"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const validate_1 = require("../users/validate");
const contact_connect_1 = require("../../model/contact-connect");
const auth_1 = require("../users/auth");
router.post('/', auth_1.Auth, async (req, res) => {
    const { first_name, last_name, phone, email, company } = req.body;
    const data = {
        first_name,
        last_name,
        phone,
        email,
        company
    };
    const { error, value } = validate_1.validatePost(data);
    console.log(value);
    console.log(req.body);
    if (error) {
        return res.status(404).json({ error: error.details[0].message });
    }
    console.log(req.body);
    const [user] = await contact_connect_1.db.query(contact_connect_1.sql `SELECT phone FROM contacts WHERE phone = ${req.body.phone}`);
    if (user)
        return res.status(404).json({ error: "Contact already exist" });
    try {
        const { first_name, last_name, phone, email, company } = value;
        const [contact] = await contact_connect_1.db.query(contact_connect_1.sql `INSERT INTO contacts(first_name, owner_id, last_name, phone, email, company) VALUES (${first_name}, ${req.user.id}, ${last_name}, ${phone}, ${email}, ${company}) RETURNING *`);
        res.status(200).json({ data: contact });
    }
    catch (error) {
        res.status(404).json({ error: error });
    }
});
exports.default = router;
//# sourceMappingURL=postContact.js.map