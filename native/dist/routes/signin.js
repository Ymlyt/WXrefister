"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/signin.ts
const express_1 = __importDefault(require("express"));
const signintaskController_1 = require("../controllers/signintaskController");
const router = express_1.default.Router();
router.post('/creat', signintaskController_1.signInTask);
router.post('/find', signintaskController_1.findSignInTask);
exports.default = router; // 确保默认导出 Router 对象
