"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSignInTsaks = exports.creatSignInTasks = exports.getAttendanceByStudent = exports.getCoursesByStudent = exports.insertAttendance = exports.getStudentCourse = exports.insertStudentCourse = exports.getCourse = exports.insertCourse = exports.getTeacher = exports.insertTeacher = exports.getStudent = exports.insertStudent = void 0;
//src\models\queries.ts
//将所有查询语句封装到此文件，供控制器调用：
exports.insertStudent = 'INSERT INTO students (name, sztuid, password) VALUES (?, ?, ?)';
exports.getStudent = 'SELECT * FROM students WHERE sztuid = ? AND password = ?';
exports.insertTeacher = 'INSERT INTO teachers (name, sztuid, password) VALUES (?, ?, ?)';
exports.getTeacher = 'SELECT * FROM teachers WHERE sztuid = ? AND password = ?';
exports.insertCourse = 'INSERT INTO courses (coursename, teacherid) VALUES (?, ?)';
exports.getCourse = 'SELECT * FROM courses WHERE teacherid = ?';
exports.insertStudentCourse = 'INSERT INTO student_courses (studentid, coursename) VALUES (?, ?)';
exports.getStudentCourse = 'SELECT * FROM student_courses WHERE studentid = ?';
exports.insertAttendance = 'INSERT INTO attendance_records (studentid, coursename, courseid, sign_in_time, location_lat, location_lng, is_within_range) VALUES (?, ?, ?, ?, ?, ?, ?)';
exports.getCoursesByStudent = 'SELECT courses.* FROM courses INNER JOIN student_courses ON courses.id = student_courses.course_id WHERE student_courses.student_id = ?';
exports.getAttendanceByStudent = 'SELECT courses.name AS course_name, attendance_records.sign_in_time FROM attendance_records INNER JOIN courses ON attendance_records.course_id = courses.id WHERE attendance_records.student_id = ?';
exports.creatSignInTasks = 'INSERT INTO sign_in_tasks (coursename , teacherid , start_time , end_time , location_lat , location_lng) VALUES (?,?,?,?,?,?)';
exports.getSignInTsaks = 'SELECT * FROM sign_in_tasks WHERE coursename = ?';
//SELECT * FROM students WHERE sztuid = '学号' AND name = '姓名';
