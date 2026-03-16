//src\index.ts
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import signinRoutes from './routes/signin';
import studentRoutes from './routes/students';
import teacherRoutes from './routes/teachers';
import courseRoutes from './routes/courses';
import attendanceRoutes from './routes/attendance';

const app = express();
const port = 3000;

// 中间件
app.use(bodyParser.json());
app.use(cors());

// 路由
app.use('/students', studentRoutes);
app.use('/teachers', teacherRoutes);


app.use('/courses', courseRoutes);
app.use('/attendance', attendanceRoutes);
app.use('/signin', signinRoutes);
// 启动服务器
app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`);
});

//ngrok http 3000
