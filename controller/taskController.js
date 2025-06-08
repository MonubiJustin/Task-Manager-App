const Task = require('../models/Task');
const asyncMiddleware = require('../middleware/async');


//@desc Get all Tasks
//@route GET /api/v1/tasks
//@access public
exports.getAllTask = asyncMiddleware(async (req, res) => {
    const tasks = await Task.find();
    res.status(200).json({ tasks });
});

//@desc Get Single Task
//@route GET /api/v1/tasks/:id
//@access public
exports.getTask = asyncMiddleware(async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.status(200).json({ task });
});

//@desc Create New Task
//@route POST /api/v1/tasks
//@access public
exports.createTask = asyncMiddleware(async (req, res) => {
    const task = await Task.create(req.body);
    res.end();
});

//@desc  Update Task
//@route PUT /api/v1/tasks/:id
//@access public
exports.updateTask = asyncMiddleware(async (req, res) => {
    const { id: taskID } = req.params;

    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
        new: true,
        runValidators: true,
    });

    if (!task) {
        return next(createCustomError(`No task with id : ${taskID}`, 404));
    }

    res.status(200).json({ task });
});

//@desc  Delete Task
//@route DELETE /api/v1/tasks/:id
//@access public
exports.deleteTask = asyncMiddleware(async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id);
    res.end();
});
