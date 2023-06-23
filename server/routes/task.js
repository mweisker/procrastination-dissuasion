/* eslint-disable function-paren-newline */
const express = require('express');

const taskController = require('../controllers/taskController');

const router = express.Router();

router.get('/:id',
  taskController.getTasks,
  (req, res) => res.status(200).json(res.locals.allTasks)
);

router.post('/',
  taskController.newTask,
  (req, res) => res.status(200).json(res.locals.newTask)
);


module.exports = router;
