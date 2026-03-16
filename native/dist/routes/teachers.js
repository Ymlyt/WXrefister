"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//src\routes\teachers.ts
const express_1 = __importDefault(require("express"));
const teachersController_1 = require("../controllers/teachersController");
const router = express_1.default.Router();
router.post('/register', teachersController_1.registerTeacher);
router.get('/find', teachersController_1.findTeacher);
exports.default = router;
