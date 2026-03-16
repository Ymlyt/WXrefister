import { Request, Response } from 'express';
import db from '../models/database';
import { sendSuccess, sendError } from '../utils/responseHandler';
import { creatSignInTasks ,getSignInTsaks} from '../models/queries';
import { RowDataPacket } from 'mysql2'; // 导入 RowDataPacket 类型

export const signInTask = (req: Request, res: Response) =>{
  const { coursename ,teacherid , start_time , end_time , location_lat , location_lng } = req.body;
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
  db.query(creatSignInTasks, [coursename , teacherid , start_time , end_time , location_lat , location_lng], (err, results) => {
    if (err) {
      sendError(res, err);
    } else {
      sendSuccess(res, { '课程名称': coursename, '签到起始时间': start_time, '签到结束时间': end_time , '签到有效范围':'50米'});
      console.log('课程名称:', coursename, '签到起始时间:', start_time, '签到结束时间:', end_time , '签到有效范围:','50米');
    }
  });
};

//查找签到任务
export const findSignInTask = (req: Request, res: Response) =>{
  const { coursename } = req.body;
  console.log("正在查找签到任务");
  console.log(coursename);
  if (!coursename) {
    return res.status(400).json({ success: false, error: '签到课程获取失败' });
  }
  db.query(getSignInTsaks, [coursename], (err, results) => {
    if (err) {
      sendError(res, err);
    } else {
      sendSuccess(res, results);
      console.log("查找课程成功");
    }
  });
};