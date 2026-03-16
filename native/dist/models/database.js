"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//src\models\database.ts
const mysql2_1 = __importDefault(require("mysql2"));
const db = mysql2_1.default.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '123456', // 替换为实际的 MySQL 密码
    database: 'APPWORK',
});
db.connect((err) => {
    if (err) {
        console.error('数据库连接失败:', err);
        return;
    }
    else {
        console.log('数据库连接成功');
    }
});
exports.default = db;
