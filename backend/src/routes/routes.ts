import { Router } from 'express';
import { getModems, addModems } from '../controllers/modems';
const router = Router();

router.get('/modems/:vendor', getModems);
router.post('/modems', addModems);

export default router;