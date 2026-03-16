//src\controllers\attendanceController.ts
import { Request, Response } from 'express';
import db from '../models/database';
import { insertAttendance, getAttendanceByStudent } from '../models/queries';
import { sendSuccess, sendError } from '../utils/responseHandler';
import { RowDataPacket } from 'mysql2';
import {haversine} from '../utils/count';
// 签到接口

let is_within_range :boolean = false;
export const signIn = (req: Request, res: Response) => {
  const { signintaskid , studentid , coursename, sign_in_time , t_lat , t_lng , location_lat, location_lng} = req.body;
  console.log(req.body);
  console.log(signintaskid);
  console.log(location_lat);      
  console.log(location_lng);    
  console.log(t_lat);    
  console.log(t_lng);     
  //经纬度计算, is_within_range
  const distance = haversine(location_lat , location_lng , t_lat , t_lng)
  console.log(distance);
  if (distance <=50){
    is_within_range = true;
    console.log("签到结果：",is_within_range);
  }
  db.query(insertAttendance, [studentid , coursename , signintaskid , sign_in_time , location_lat , location_lng , is_within_range], (err, results) => {
    if (err) {
      sendError(res, err);
    } else {
      sendSuccess(res, { is_within_range });
    }
  });
};

// 获取签到记录接口
export const getAttendance = (req: Request, res: Response) => {
  const student_id = req.params.student_id;
  db.query(getAttendanceByStudent, [student_id], (err, results) => {
    if (err) {
      sendError(res, err);
    } else {
      sendSuccess(res, results);
    }
  });
};
