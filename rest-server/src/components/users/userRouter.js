import express from 'express';

import {
  fetchAllUserController,
  fetchSingleUserController,
  fetchSingleUserByEmailController
} from './userControllers';

const router = express.Router();

router.route('/fetchAllUsers')
  .get(fetchAllUserController);

router.route('/fetchSingleUser/:id')
  .get(fetchSingleUserController);

router.route('/fetchUserByEmail/:email')
  .get(fetchSingleUserByEmailController);

export default router;
