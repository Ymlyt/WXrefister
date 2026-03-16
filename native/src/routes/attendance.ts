// src\routes\attendance.ts
import express from 'express';
import { signIn, getAttendance } from '../controllers/attendanceController';

const router = express.Router();

router.post('/signin', signIn);  // 签到接口
router.get('/:studentid', getAttendance);  // 获取签到记录接口

export default router;  // 确保正确导出
