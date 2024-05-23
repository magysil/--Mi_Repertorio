import express from 'express';
import { postCancion,putCancion,deleteCancion} from '../controller/repertorio.js';
const router = express.Router();


router.post('/',postCancion )
router.put('/:id', putCancion)
router.delete('/', deleteCancion)

export default router;