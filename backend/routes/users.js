const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');

router.get('/', usersController.showUsers);
router.post('/', usersController.createUsers);
router.delete('/', usersController.deleteUsers);

router.get('/:id/tasks', usersController.showUserTasks);
router.post('/:id/tasks', usersController.createUserTasks);
router.get('/:id/tasks/others', usersController.othersUserTasks);
router.delete('/:id/tasks/:subId', usersController.deleteUserTasks);
router.patch('/:id/tasks/:subId', usersController.patchUserTasks);
router.get('/:id/search/:search', usersController.otherUser);

module.exports = router;