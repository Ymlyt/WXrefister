// src/routes/courses.ts
import express from 'express';
import { selectCourse, findCourses , creatCourse , findStudentCourse} from '../controllers/coursesController';

const router = express.Router();

router.post('/creat', creatCourse);  // 创建课程接口
router.post('/select', selectCourse);  // 选课接口
router.get('/findteacher', findCourses);  // 获取学生课程接口
router.get('/findstudent', findStudentCourse);
export default router;  // 确保正确导出
