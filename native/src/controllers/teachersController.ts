//src\controllers\teachersController.ts
import { Request, Response } from 'express';
import db from '../models/database';
import { insertTeacher } from '../models/queries';
import { getTeacher } from '../models/queries';
import { sendSuccess, sendError } from '../utils/responseHandler';
import { RowDataPacket } from 'mysql2';

// 注册教师
export const registerTeacher = (req: Request, res: Response): void => {
  console.log("开始注册");
  const { name, sztuid, password } = req.body;
  if (!name || !sztuid || !password) {
    res.status(400).json({ error: '所有字段均为必填项' });
    return;
  }
  db.query(insertTeacher, [name, sztuid, password], (err, results) => {
    if (err) {
      sendError(res, err);
      console.log("注册失败");
    } else {
      sendSuccess(res, {name, sztuid, password});
      console.log("注册成功");
    }
  });
};

export const findTeacher = (req: Request, res: Response) => {//已成功
  const { sztuid, password } = req.query;
  if (!sztuid || !password) {
    return res.status(400).json({ success: false, error: '工号和密码为必填项' });
  }
  db.query(getTeacher, [sztuid, password], (err, results) => {
    if (err) {
      sendError(res, err);
    } else {
      const rows = results as RowDataPacket[]; // 明确断言为查询结果
      if (rows.length > 0) {
        const Teacher = rows[0];
        sendSuccess(res, { sztuid: Teacher.sztuid, name: Teacher.name , password: Teacher.password});
      } else {
        res.status(401).json({ success: false, error: '工号或密码错误' });
      }
    }
  });
};
