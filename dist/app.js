"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var app = express_1.default();
// imported route
const login_1 = __importDefault(require("./routes/users/login"));
const register_1 = __importDefault(require("./routes/users/register"));
const postContact_1 = __importDefault(require("./routes/contacts/postContact"));
const getAllContacts_1 = __importDefault(require("./routes/contacts/getAllContacts"));
const deleteContact_1 = __importDefault(require("./routes/contacts/deleteContact"));
const updateContact_1 = __importDefault(require("./routes/contacts/updateContact"));
app.use(morgan_1.default('dev'));
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookie_parser_1.default());
// route
app.use('/users', login_1.default);
app.use('/users', register_1.default);
app.use('/api/post', postContact_1.default);
app.use('/api/get', getAllContacts_1.default);
app.use('/api/delete', deleteContact_1.default);
app.use('/api/update', updateContact_1.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(http_errors_1.default(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
exports.default = app;
//# sourceMappingURL=app.js.map