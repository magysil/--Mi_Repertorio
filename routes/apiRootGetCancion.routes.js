import express from 'express';
import { mostrarCancion} from '../controller/repertorio.js';
const router = express.Router();


router.get('/',mostrarCancion )

export default router;
