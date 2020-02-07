"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const auth_1 = require("../users/auth");
const contact_connect_1 = require("../../model/contact-connect");
router.get('/', auth_1.Auth, async (req, res) => {
    const rows = await contact_connect_1.db.query(contact_connect_1.sql `SELECT * FROM contacts WHERE owner_id=${req.user.id};`);
    res.status(200).json({ data: rows });
});
router.get('/:contactID', auth_1.Auth, async (req, res) => {
    const { contactID } = req.params;
    try {
        const [row] = await contact_connect_1.db.query(contact_connect_1.sql `SELECT * FROM contacts WHERE id = ${contactID};`);
        if (!row)
            return res.status(404).json("No such user");
        res.status(200).json(row);
    }
    catch (error) {
        res.status(404).json({ error: error });
    }
});
router.delete('/delete/:deleteID', async (req, res) => {
    const { deleteID } = req.params;
    try {
        const row = await contact_connect_1.db.query(contact_connect_1.sql `DELETE FROM contacts WHERE id = ${deleteID}`);
        res.status(200).json({
            data: `Deleted ${row[0].email} Successfully`,
        });
    }
    catch (error) {
        res.status(404).json({ error: "No user" });
    }
});
exports.default = router;
//# sourceMappingURL=getAllContacts.js.map