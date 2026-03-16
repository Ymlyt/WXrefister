"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const database_1 = __importDefault(require("../models/database"));
const responseHandler_1 = require("../utils/responseHandler");
const login = (req, res) => {
    const { student_id, password } = req.body;
    if (!student_id || !password) {
        return res.status(400).json({ success: false, error: '学号和密码为必填项' });
    }
    const query = 'SELECT * FROM students WHERE student_id = ? AND password = ?';
    database_1.default.query(query, [student_id, password], (err, results) => {
        if (err) {
            (0, responseHandler_1.sendError)(res, err);
        }
        else {
            const rows = results; // 明确断言为查询结果
            if (rows.length > 0) {
                const student = rows[0];
                (0, responseHandler_1.sendSuccess)(res, { student_id: student.student_id, name: student.name, class_id: student.class_id });
            }
            else {
                res.status(401).json({ success: false, error: '学号或密码错误' });
            }
        }
    });
};
exports.login = login;
