import express from 'express';
import { postCancion,putCancion,deleteCancion} from '../controller/repertorio.js';
const router = express.Router();


router.post('/',postCancion )
router.put('/:id', putCancion)
router.delete('/:id', deleteCancion)

export default router;