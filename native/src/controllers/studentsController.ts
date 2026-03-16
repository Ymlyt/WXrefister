//src\controllers\studentsController.ts
import { Request, Response } from 'express';
import db from '../models/database';
import { insertStudent } from '../models/queries';
import { getStudent } from '../models/queries';
import { sendSuccess, sendError } from '../utils/responseHandler';
import { RowDataPacket } from 'mysql2';

export const registerStudent = (req: Request, res: Response) => {//已成功
  console.log("开始注册");
  const { name, sztuid, password } = req.body;

  if (!name || !sztuid || !password) {
    res.status(400).json({ error: '所有字段均为必填项' });
    return;
  }

  db.query(insertStudent, [name, sztuid,password], (err, results) => {
    if (err) {
      sendError(res, err);
      console.log("注册失败");
    } else {
      sendSuccess(res, { name, sztuid });
      console.log("注册成功");
    }
  });
};

export const findStudent = (req: Request, res: Response) => {//已成功
  console.log("正在获取学生数据");
  const { sztuid, password } = req.query;
  if (!sztuid || !password) {
    return res.status(400).json({ success: false, error: '学号和密码为必填项' });
  }
  db.query(getStudent, [sztuid, password], (err, results) => {
    if (err) {
      sendError(res, err);
      console.log("获取学生数据失败");
    } else {
      const rows = results as RowDataPacket[]; // 明确断言为查询结果
      if (rows.length > 0) {
        console.log("获取学生数据成功");
        const student = rows[0];
        sendSuccess(res, { sztuid: student.sztuid , name: student.name , password: student.password});
      } else {
        res.status(401).json({ success: false, error: '学号或密码错误' });
      }
    }
  });
};
