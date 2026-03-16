"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//src\routes\students.ts
const express_1 = __importDefault(require("express"));
const studentsController_1 = require("../controllers/studentsController");
const router = express_1.default.Router();
router.post('/register', studentsController_1.registerStudent);
router.get('/find', studentsController_1.findStudent);
exports.default = router;
