// src/routes/signin.ts
import express from 'express';
import { signInTask , findSignInTask} from '../controllers/signintaskController';

const router = express.Router();

router.post('/creat', signInTask);
router.post('/find', findSignInTask);
export default router; // 确保默认导出 Router 对象
