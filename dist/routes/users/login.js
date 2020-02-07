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
router.post('/login', async (req, res) => {
    const { error, value } = validate_1.validateLogin(req.body);
    if (error) {
        return res.status(404).json({ error: error.details[0].message });
    }
    const [existingUser] = await contact_connect_1.db.query(contact_connect_1.sql `SELECT * FROM users WHERE email = ${req.body.email}`);
    console.log(existingUser);
    if (!existingUser) {
        return res.status(404).json({ error: "Wrong email or you have not register" });
    }
    try {
        const { password } = req.body;
        const validPassword = await bcryptjs_1.default.compare(password, existingUser.password);
        if (!validPassword) {
            return res.status(404).json({ data: "Invalid password" });
        }
        console.log('user');
        const token = jsonwebtoken_1.default.sign({ id: existingUser.id }, process.env.SECRET_KEY);
        res.header("auth", token).status(200).json({ data: {
                id: existingUser.id,
                username: existingUser.username,
                email: existingUser.email
            },
            token
        });
    }
    catch (error) {
        return res.status(404).json({ error: error });
    }
});
exports.default = router;
//# sourceMappingURL=login.js.map