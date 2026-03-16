"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findTeacher = exports.registerTeacher = void 0;
const database_1 = __importDefault(require("../models/database"));
const queries_1 = require("../models/queries");
const queries_2 = require("../models/queries");
const responseHandler_1 = require("../utils/responseHandler");
// 注册教师
const registerTeacher = (req, res) => {
    console.log("开始注册");
    const { name, sztuid, password } = req.body;
    if (!name || !sztuid || !password) {
        res.status(400).json({ error: '所有字段均为必填项' });
        return;
    }
    database_1.default.query(queries_1.insertTeacher, [name, sztuid, password], (err, results) => {
        if (err) {
            (0, responseHandler_1.sendError)(res, err);
            console.log("注册失败");
        }
        else {
            (0, responseHandler_1.sendSuccess)(res, { name, sztuid, password });
            console.log("注册成功");
        }
    });
};
exports.registerTeacher = registerTeacher;
const findTeacher = (req, res) => {
    const { sztuid, password } = req.query;
    if (!sztuid || !password) {
        return res.status(400).json({ success: false, error: '工号和密码为必填项' });
    }
    database_1.default.query(queries_2.getTeacher, [sztuid, password], (err, results) => {
        if (err) {
            (0, responseHandler_1.sendError)(res, err);
        }
        else {
            const rows = results; // 明确断言为查询结果
            if (rows.length > 0) {
                const Teacher = rows[0];
                (0, responseHandler_1.sendSuccess)(res, { sztuid: Teacher.sztuid, name: Teacher.name, password: Teacher.password });
            }
            else {
                res.status(401).json({ success: false, error: '工号或密码错误' });
            }
        }
    });
};
exports.findTeacher = findTeacher;
