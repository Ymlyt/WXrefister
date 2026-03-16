//src\routes\students.ts
import express from 'express';
import { registerStudent , findStudent } from '../controllers/studentsController';

const router = express.Router();

router.post('/register', registerStudent);
router.get('/find', findStudent);

export default router;
