"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/courses.ts
const express_1 = __importDefault(require("express"));
const coursesController_1 = require("../controllers/coursesController");
const router = express_1.default.Router();
router.post('/creat', coursesController_1.creatCourse); // 创建课程接口
router.post('/select', coursesController_1.selectCourse); // 选课接口
router.get('/findteacher', coursesController_1.findCourses); // 获取学生课程接口
router.get('/findstudent', coursesController_1.findStudentCourse);
exports.default = router; // 确保正确导出
