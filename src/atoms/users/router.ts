import Router from 'express';
import * as controllers from './controllers';
import { authenticate } from '../../middleware';

const router = Router();

router.post('/login', controllers.login);
router.post('/signup', controllers.signup);
router.get('/profile', authenticate(), controllers.profile);
router.patch('/profile', authenticate(), controllers.editProfile);
router.post('/logout', authenticate(), controllers.logout);
router.post('/change-password', authenticate(), controllers.changePassword);

export default router;
