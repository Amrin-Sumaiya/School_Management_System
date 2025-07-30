import express from 'express';
import {
  getAllUser,
  getUserDetails,
  userLogin,
  userRegistration,
} from '../CONTROLLER/userRoleController.js';

const router = express.Router();

router.post('/register', userRegistration);

router.post('/login', userLogin);

router.get('/all-user-list', getAllUser);
router.get('/user-details', getUserDetails);

export default router;
