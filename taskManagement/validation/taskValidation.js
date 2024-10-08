const Joi = require('joi');


const taskSchema = Joi.object({
    title: Joi.string().min(3).max(255).required(),
    description: Joi.string().min(5).max(500).required(),
    completed: Joi.boolean(),
    taskDate: Joi.date().required(),
});

const updateTaskSchema = Joi.object({
    title: Joi.string().min(3).max(255),
    description: Joi.string().min(5).max(500),
    completed: Joi.boolean(),
    taskDate: Joi.date(),
});

module.exports = {
    taskSchema,
    updateTaskSchema,
};
