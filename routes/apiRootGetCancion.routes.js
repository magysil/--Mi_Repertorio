import express from 'express';
import { getCancion} from '../controller/repertorio.js';
const router = express.Router();


router.get('/',getCancion )

export default router;
