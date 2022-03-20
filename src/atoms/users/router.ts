import Router from 'express';
import * as controllers from './controllers';
import { authenticate } from '../../middlewares';

const router = Router();

router.post('/login', controllers.login);
router.post('/signup', controllers.signup);
router.get('/profile', authenticate(), controllers.profile);
router.post('/logout', controllers.logout);

export default router;
