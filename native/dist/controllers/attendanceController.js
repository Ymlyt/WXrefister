"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAttendance = exports.signIn = void 0;
const database_1 = __importDefault(require("../models/database"));
const queries_1 = require("../models/queries");
const responseHandler_1 = require("../utils/responseHandler");
const count_1 = require("../utils/count");
// 签到接口
let is_within_range = false;
const signIn = (req, res) => {
    const { signintaskid, studentid, coursename, sign_in_time, t_lat, t_lng, location_lat, location_lng } = req.body;
    console.log(req.body);
    console.log(signintaskid);
    console.log(location_lat);
    console.log(location_lng);
    console.log(t_lat);
    console.log(t_lng);
    const distance = (0, count_1.haversine)(location_lat, location_lng, t_lat, t_lng);
    console.log(distance);
    if (distance <= 50) {
        is_within_range = true;
        console.log("签到结果：", is_within_range);
    }
    //经纬度计算, is_within_range
    database_1.default.query(queries_1.insertAttendance, [studentid, coursename, signintaskid, sign_in_time, location_lat, location_lng, is_within_range], (err, results) => {
        if (err) {
            (0, responseHandler_1.sendError)(res, err);
        }
        else {
            // 注意: results 是一个包含插入信息的对象，插入ID在 ResultSetHeader 中
            (0, responseHandler_1.sendSuccess)(res, { is_within_range });
        }
    });
};
exports.signIn = signIn;
// 获取签到记录接口
const getAttendance = (req, res) => {
    const student_id = req.params.student_id;
    database_1.default.query(queries_1.getAttendanceByStudent, [student_id], (err, results) => {
        if (err) {
            (0, responseHandler_1.sendError)(res, err);
        }
        else {
            (0, responseHandler_1.sendSuccess)(res, results);
        }
    });
};
exports.getAttendance = getAttendance;
