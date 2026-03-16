//src\models\database.ts
import mysql from 'mysql2';

const db = mysql.createConnection({
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: '123456',  // 替换为实际的 MySQL 密码
  database: 'APPWORK',
});

db.connect((err) => {
  if (err) {
    console.error('数据库连接失败:', err);
    return;
  } else {
    console.log('数据库连接成功');
  }
});

export default db;
