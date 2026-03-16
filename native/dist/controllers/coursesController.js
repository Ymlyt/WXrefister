"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findStudentCourse = exports.findCourses = exports.selectCourse = exports.creatCourse = void 0;
const database_1 = __importDefault(require("../models/database"));
const queries_1 = require("../models/queries");
const responseHandler_1 = require("../utils/responseHandler");
// 选课接口
const creatCourse = (req, res) => {
    console.log("正在创建课程");
    const { coursename, teacherid } = req.body;
    if (!coursename || !teacherid) {
        res.status(400).json({ error: '所有字段均为必填项' });
        return;
    }
    database_1.default.query(queries_1.insertCourse, [coursename, teacherid], (err, results) => {
        if (err) {
            (0, responseHandler_1.sendError)(res, err);
            console.log("创建课程失败");
        }
        else {
            (0, responseHandler_1.sendSuccess)(res, { coursename: coursename, teacherid: teacherid });
            console.log("创建课程成功");
        }
    });
};
exports.creatCourse = creatCourse;
const selectCourse = (req, res) => {
    console.log("正在选课");
    const { sztuid, coursename } = req.query;
    database_1.default.query(queries_1.insertStudentCourse, [sztuid, coursename], (err, results) => {
        if (err) {
            (0, responseHandler_1.sendError)(res, err);
            console.log("选课失败");
        }
        else {
            (0, responseHandler_1.sendSuccess)(res, { sztuid, coursename });
            console.log("选课成功");
        }
    });
};
exports.selectCourse = selectCourse;
//查找老师管理课程
const findCourses = (req, res) => {
    console.log("正在查找老师课程信息");
    const { teacherid } = req.query;
    console.log("查找的老师id为:", teacherid);
    database_1.default.query(queries_1.getCourse, [teacherid], (err, results) => {
        if (err) {
            (0, responseHandler_1.sendError)(res, err);
            console.log(results);
            console.log("查找失败");
        }
        else {
            (0, responseHandler_1.sendSuccess)(res, results);
            console.log(results);
            console.log("查找成功");
        }
    });
};
exports.findCourses = findCourses;
//查找学生已选课程
const findStudentCourse = (req, res) => {
    console.log("正在查找老师课程信息");
    const { studentid } = req.query;
    console.log("查找的学生id为:", studentid);
    database_1.default.query(queries_1.getStudentCourse, [studentid], (err, results) => {
        if (err) {
            (0, responseHandler_1.sendError)(res, err);
            console.log(results);
            console.log("查找失败");
        }
        else {
            (0, responseHandler_1.sendSuccess)(res, results);
            console.log(results);
            console.log("查找成功");
        }
    });
};
exports.findStudentCourse = findStudentCourse;
