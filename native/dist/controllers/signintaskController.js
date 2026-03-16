"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findSignInTask = exports.signInTask = void 0;
const database_1 = __importDefault(require("../models/database"));
const responseHandler_1 = require("../utils/responseHandler");
const queries_1 = require("../models/queries");
const signInTask = (req, res) => {
    const { coursename, teacherid, start_time, end_time, location_lat, location_lng } = req.body;
    console.log("正在创建签到任务");
    console.log(coursename);
    console.log(teacherid);
    console.log(start_time);
    console.log(end_time);
    console.log(location_lat);
    console.log(location_lng);
    if (!start_time || !end_time) {
        return res.status(400).json({ success: false, error: '起始时间和结束时间为必填项' });
    }
    database_1.default.query(queries_1.creatSignInTasks, [coursename, teacherid, start_time, end_time, location_lat, location_lng], (err, results) => {
        if (err) {
            (0, responseHandler_1.sendError)(res, err);
        }
        else {
            (0, responseHandler_1.sendSuccess)(res, { '课程名称': coursename, '签到起始时间': start_time, '签到结束时间': end_time, '签到有效范围': '50米' });
            console.log('课程名称:', coursename, '签到起始时间:', start_time, '签到结束时间:', end_time, '签到有效范围:', '50米');
        }
    });
};
exports.signInTask = signInTask;
//查找签到任务
const findSignInTask = (req, res) => {
    const { coursename } = req.body;
    console.log("正在查找签到任务");
    console.log(coursename);
    if (!coursename) {
        return res.status(400).json({ success: false, error: '签到课程获取失败' });
    }
    database_1.default.query(queries_1.getSignInTsaks, [coursename], (err, results) => {
        if (err) {
            (0, responseHandler_1.sendError)(res, err);
        }
        else {
            (0, responseHandler_1.sendSuccess)(res, results);
            console.log("查找课程成功");
        }
    });
};
exports.findSignInTask = findSignInTask;
