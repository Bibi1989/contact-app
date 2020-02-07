"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
exports.validateRegister = (body) => {
    const schema = joi_1.default.object({
        username: joi_1.default.string().trim(),
        email: joi_1.default.string().trim().email(),
        password: joi_1.default.string().trim().min(4).required()
    });
    const { error, value } = schema.validate(body, { abortEarly: false, stripUnknown: true });
    return {
        error,
        value
    };
};
exports.validateLogin = (body) => {
    const schema = joi_1.default.object({
        email: joi_1.default.string().trim().email(),
        password: joi_1.default.string().trim().min(4).required()
    });
    const { error, value } = schema.validate(body, { abortEarly: false, stripUnknown: true });
    return {
        error,
        value
    };
};
exports.validatePost = (body) => {
    const schema = joi_1.default.object({
        first_name: joi_1.default.string().trim().required(),
        last_name: joi_1.default.string().trim(),
        email: joi_1.default.string().trim().email(),
        phone: joi_1.default.string().trim().min(4).required(),
        company: joi_1.default.string().trim()
    });
    const { error, value } = schema.validate(body, { abortEarly: false, stripUnknown: true });
    return {
        error,
        value
    };
};
//# sourceMappingURL=validate.js.map