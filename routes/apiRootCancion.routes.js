import express from 'express';
import { postCancion,putCancion,deleteCancion, getCancion} from '../controller/repertorio.js';
const router = express.Router();


router.post('/',postCancion )
router.get('/', getCancion)
router.put('/:id', putCancion)
router.delete('/', deleteCancion)

export default router;