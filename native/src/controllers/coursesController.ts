//src\controllers\coursesController.ts
import { Request, Response } from 'express';
import db from '../models/database';
import { insertCourse, getCoursesByStudent , insertStudentCourse , getCourse , getStudentCourse} from '../models/queries';
import { sendSuccess, sendError } from '../utils/responseHandler';

// 创建课程课接口
export const creatCourse = (req: Request, res: Response) => {
  console.log("正在创建课程");
  const { coursename, teacherid } = req.body;
  if (!coursename || !teacherid) {
    res.status(400).json({ error: '所有字段均为必填项' });
    return;
  }
  db.query(insertCourse, [coursename, teacherid], (err, results) => {
    if (err) {
      sendError(res, err);
      console.log("创建课程失败");
    } else {
      sendSuccess(res, { coursename: coursename, teacherid: teacherid });
      console.log("创建课程成功");
    }
  });
};

//选课接口
export const selectCourse = (req: Request, res: Response) => {
  console.log("正在选课");
  const { sztuid, coursename } = req.query;
  
  db.query(insertStudentCourse, [sztuid, coursename], (err, results) => {
    if (err) {
      sendError(res, err);
      console.log("选课失败");
    } else {
      sendSuccess(res, { sztuid, coursename });
      console.log("选课成功");
    }
  }); 
};

//查找老师管理课程
export const findCourses = (req: Request, res: Response) => {
  console.log("正在查找老师课程信息");
  const {teacherid} = req.query;
  console.log("查找的老师id为:",teacherid)
  db.query(getCourse, [teacherid], (err, results) => {
    if (err) {
      sendError(res, err);
      console.log(results);
      console.log("查找失败");
    } else {
      sendSuccess(res, results);
      console.log(results);
      console.log("查找成功");
    }
  });
};

//查找学生已选课程
export const findStudentCourse = (req: Request, res: Response) => {
  console.log("正在查找老师课程信息");
  const {studentid} = req.query;
  console.log("查找的学生id为:",studentid)
  db.query(getStudentCourse, [studentid], (err, results) => {
    if (err) {
      sendError(res, err);
      console.log(results);
      console.log("查找失败");
    } else {
      sendSuccess(res, results);
      console.log(results);
      console.log("查找成功");
    }
  });
};


