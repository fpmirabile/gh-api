import { Router } from 'express';
import { param, query } from 'express-validator';
import { RepoController } from '../controllers/repo.controller';
import { validateAcceptHeader } from '../middlewares/header.middleware';
import { validate } from '../middlewares/validate.middleware';

const router = Router();
const repoController = new RepoController();

router.get(
  '/:username/repos',
  validateAcceptHeader,
  [
    param('username')
      .isString()
      .trim()
      .notEmpty()
      .withMessage('Username must be a non-empty string'),
    query('includeForks')
      .optional()
      .isBoolean()
      .withMessage('includeForks must be a boolean (true/false)'),
    validate
  ],
  repoController.getUserRepos
);

export default router;
