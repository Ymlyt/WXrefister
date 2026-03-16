//src\models\queries.ts
//将所有查询语句封装到此文件，供控制器调用：
export const insertStudent = 'INSERT INTO students (name, sztuid, password) VALUES (?, ?, ?)';
export const getStudent = 'SELECT * FROM students WHERE sztuid = ? AND password = ?';

export const insertTeacher = 'INSERT INTO teachers (name, sztuid, password) VALUES (?, ?, ?)';
export const getTeacher = 'SELECT * FROM teachers WHERE sztuid = ? AND password = ?';


export const insertCourse = 'INSERT INTO courses (coursename, teacherid) VALUES (?, ?)';
export const getCourse = 'SELECT * FROM courses WHERE teacherid = ?';


export const insertStudentCourse = 'INSERT INTO student_courses (studentid, coursename) VALUES (?, ?)';
export const getStudentCourse = 'SELECT * FROM student_courses WHERE studentid = ?';

export const insertAttendance = 'INSERT INTO attendance_records (studentid, coursename, courseid, sign_in_time, location_lat, location_lng, is_within_range) VALUES (?, ?, ?, ?, ?, ?, ?)';

export const getCoursesByStudent = 'SELECT courses.* FROM courses INNER JOIN student_courses ON courses.id = student_courses.course_id WHERE student_courses.student_id = ?';
export const getAttendanceByStudent = 'SELECT courses.name AS course_name, attendance_records.sign_in_time FROM attendance_records INNER JOIN courses ON attendance_records.course_id = courses.id WHERE attendance_records.student_id = ?';

export const creatSignInTasks = 'INSERT INTO sign_in_tasks (coursename , teacherid , start_time , end_time , location_lat , location_lng) VALUES (?,?,?,?,?,?)'
export const getSignInTsaks = 'SELECT * FROM sign_in_tasks WHERE coursename = ?';

//SELECT * FROM students WHERE sztuid = '学号' AND name = '姓名';