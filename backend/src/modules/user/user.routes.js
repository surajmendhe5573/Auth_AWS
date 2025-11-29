import { Router } from 'express';
import UserController from './user.controller.js';

const router = Router();
const userController = new UserController();

router.get('/', userController.getAll);
router.delete('/:id', userController.deleteUser);
router.get('/:id', userController.getById);

export default router;
