"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const auth_1 = require("../users/auth");
const contact_connect_1 = require("../../model/contact-connect");
router.delete('/:deleteID', auth_1.Auth, async (req, res) => {
    try {
        const { deleteID } = req.params;
        const [row] = await contact_connect_1.db.query(contact_connect_1.sql `DELETE FROM contacts WHERE id = ${deleteID}`);
        return res.status(200).json({
            data: `Deleted Successfully`,
        });
    }
    catch (error) {
        res.status(404).json({ error: error });
    }
});
exports.default = router;
//# sourceMappingURL=deleteContact.js.map