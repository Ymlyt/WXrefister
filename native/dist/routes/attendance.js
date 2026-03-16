"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src\routes\attendance.ts
const express_1 = __importDefault(require("express"));
const attendanceController_1 = require("../controllers/attendanceController");
const router = express_1.default.Router();
router.post('/signin', attendanceController_1.signIn); // 签到接口
router.get('/:studentid', attendanceController_1.getAttendance); // 获取签到记录接口
exports.default = router; // 确保正确导出
