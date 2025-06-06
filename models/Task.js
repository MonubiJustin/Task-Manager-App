const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Task name is required'],
        trim: true,
        maxlength: [50, 'Task name cannot exceed 50 charaters']
    },
    completed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);