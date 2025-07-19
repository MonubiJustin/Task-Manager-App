const Task = require("../models/Task");
const asyncMiddleware = require("../middleware/async");

//@desc Get all Tasks
//@route GET /api/v1/tasks
//@access private
exports.getAllTask = asyncMiddleware(async (req, res) => {
  const tasks = await Task.find({ user_id: req.user.id });
  res.status(200).json({
    success: true,
    message: "Fetched all tasks successfully",
    data: tasks,
  });
});

//@desc Get Single Task
//@route GET /api/v1/tasks/:id
//@access private
exports.getTask = asyncMiddleware(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task)
    return res.status(404).json({
      success: false,
      meesage: "Task was not found",
    });

  res.status(200).json({
    success: true,
    message: "Fetched task successfully",
    data: task,
  });
});

//@desc Create New Task
//@route POST /api/v1/tasks
//@access private
exports.createTask = asyncMiddleware(async (req, res) => {
  console.log("create task route hit");
  console.log(req.user);
  const task = await Task.create({
    name: req.body.name,
    user_id: req.user.id,
  });
  res.status(201).json({
    success: true,
    message: "Task created successfully",
    data: task,
  });
});

//@desc  Update Task
//@route PUT /api/v1/tasks/:id
//@access private
exports.updateTask = asyncMiddleware(async (req, res) => {
  const { id: taskID } = req.params;

  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404));
  }

  res.status(200).json({
    success: true,
    message: "Task updated successfully",
    data: task,
  });
});

//@desc  Delete Task
//@route DELETE /api/v1/tasks/:id
//@access private
exports.deleteTask = asyncMiddleware(async (req, res) => {
  if (await Task.findByIdAndDelete(req.params.id))
    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });

  res.status(404).json({
    success: false,
    message: "Task with the given ID was not found",
  });
});
