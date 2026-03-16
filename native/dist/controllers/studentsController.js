"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findStudent = exports.registerStudent = void 0;
const database_1 = __importDefault(require("../models/database"));
const queries_1 = require("../models/queries");
const queries_2 = require("../models/queries");
const responseHandler_1 = require("../utils/responseHandler");
const registerStudent = (req, res) => {
    console.log("开始注册");
    const { name, sztuid, password } = req.body;
    if (!name || !sztuid || !password) {
        res.status(400).json({ error: '所有字段均为必填项' });
        return;
    }
    database_1.default.query(queries_1.insertStudent, [name, sztuid, password], (err, results) => {
        if (err) {
            (0, responseHandler_1.sendError)(res, err);
            console.log("注册失败");
        }
        else {
            (0, responseHandler_1.sendSuccess)(res, { name, sztuid });
            console.log("注册成功");
        }
    });
};
exports.registerStudent = registerStudent;
const findStudent = (req, res) => {
    console.log("正在获取学生数据");
    const { sztuid, password } = req.query;
    if (!sztuid || !password) {
        return res.status(400).json({ success: false, error: '学号和密码为必填项' });
    }
    database_1.default.query(queries_2.getStudent, [sztuid, password], (err, results) => {
        if (err) {
            (0, responseHandler_1.sendError)(res, err);
            console.log("获取学生数据失败");
        }
        else {
            const rows = results; // 明确断言为查询结果
            if (rows.length > 0) {
                console.log("获取学生数据成功");
                const student = rows[0];
                (0, responseHandler_1.sendSuccess)(res, { sztuid: student.sztuid, name: student.name, password: student.password });
            }
            else {
                res.status(401).json({ success: false, error: '学号或密码错误' });
            }
        }
    });
};
exports.findStudent = findStudent;
