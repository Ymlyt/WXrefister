//src\routes\teachers.ts
import express from 'express';
import { registerTeacher , findTeacher } from '../controllers/teachersController';

const router = express.Router();

router.post('/register', registerTeacher);
router.get('/find', findTeacher);

export default router;
