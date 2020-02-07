"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const validate_1 = require("./validate");
const contact_connect_1 = require("../../model/contact-connect");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
router.post('/register', async (req, res) => {
    const { error, value } = validate_1.validateRegister(req.body);
    if (error) {
        return res.status(404).json({ error: error.details[0].message });
    }
    const [existingUser] = await contact_connect_1.db.query(contact_connect_1.sql `SELECT email FROM users WHERE email = ${value.email}`);
    if (existingUser) {
        return res.status(404).json({ error: "Email exist" });
    }
    try {
        const { username, email, password } = value;
        const salt = await bcryptjs_1.default.genSalt(10);
        const hashedPassword = await bcryptjs_1.default.hash(password, salt);
        const [contact] = await contact_connect_1.db.query(contact_connect_1.sql `
      INSERT INTO users (username, email, password) VALUES (${username}, ${email}, ${hashedPassword}) returning *`);
        const token = jsonwebtoken_1.default.sign({ id: contact.id, username: contact.username }, process.env.SECRET_KEY);
        res.header("auth", token).status(200).json({ data: {
                id: contact.id,
                username: contact.username,
                email: contact.email
            },
            token
        });
    }
    catch (error) {
        res.status(404).json({ error: error });
    }
});
exports.default = router;
//# sourceMappingURL=register.js.map