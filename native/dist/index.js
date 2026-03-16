"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//src\index.ts
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const signin_1 = __importDefault(require("./routes/signin"));
const students_1 = __importDefault(require("./routes/students"));
const teachers_1 = __importDefault(require("./routes/teachers"));
const courses_1 = __importDefault(require("./routes/courses"));
const attendance_1 = __importDefault(require("./routes/attendance"));
const app = (0, express_1.default)();
const port = 3000;
// 中间件
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
// 路由
app.use('/students', students_1.default);
app.use('/teachers', teachers_1.default);
app.use('/courses', courses_1.default);
app.use('/attendance', attendance_1.default);
app.use('/signin', signin_1.default);
// 启动服务器
app.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}`);
});
//ngrok http 3000
