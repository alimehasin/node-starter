import Router from 'express';
import * as controllers from './controllers';
import { getObject } from './middleware';

const router = Router();

// Define your routes here
router.get('/', controllers.list);
router.get('/:id', getObject, controllers.retrieve);

router.post('/', controllers.create);
router.patch('/:id', getObject, controllers.update);
router.delete('/:id', getObject, controllers.destroy);

export default router;
