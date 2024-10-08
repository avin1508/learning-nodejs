const express = require('express');
const taskRouter = express.Router();
const { createTask, getTasks, getTaskById, updateTask, deleteTask } = require('../controller/taskController');
const authenticate = require('../middleware/authenticate')
const validate = require('../middleware/validate');
const { taskSchema, updateTaskSchema } = require('../validation/taskValidation');

taskRouter.use(authenticate);


taskRouter.post('/createtasks', validate(taskSchema), createTask);
taskRouter.get('/gettasks', getTasks);
taskRouter.get('/tasks/:id', getTaskById);
taskRouter.put('/tasks/:id', validate(updateTaskSchema), updateTask);
taskRouter.delete('/tasks/:id', deleteTask);

module.exports = taskRouter;
