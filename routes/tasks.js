const express = require('express');

const router = express.Router();
const Tasks = require('../models/Tasks');
const { check, validationResult } = require('express-validator');

const auth = require('../middleware/auth');

//@Route     GET /api/question
//@Desc      Get questions
//@access    PRIVATE
router.get('/', async (req, res) => {
    try {
        const tasks = await Tasks.find();
        res.json(tasks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/:name', async (req, res) => {
    try {
        const tasks = await Tasks.findOne({ taskname: req.params.name });
        res.json(tasks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@Route     POST /api/question
//@Desc      Add new questions
//@access    PRIVATE

router.post(
    '/',
    [
        [
            check('sprname').not().isEmpty(),
            check('taskname').not().isEmpty(),
            check('taskdescription').not().isEmpty(),
            check('tasksummary').not().isEmpty(),
            check('taskpriority').not().isEmpty(),
            check('taskassignee').not().isEmpty(),
            check('taskreporter').not().isEmpty(),
            check('taskstartdate').not().isEmpty(),
            check('taskenddate').not().isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            sprname,
            taskname,
            taskdescription,
            tasksummary,
            taskpriority,
            taskassignee,
            taskreporter,
            taskstartdate,
            taskenddate
        } = req.body;

        try {
            const newTasks = new Tasks({
                sprname,
                taskname,
                taskdescription,
                tasksummary,
                taskpriority,
                taskassignee,
                taskreporter,
                taskstartdate,
                taskenddate,
                taskprogress: "ToDo"
            });

            let tasks = await newTasks.save();
            res.json(tasks);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

//@Route     PUT /api/question:/id
//@Desc      Update questions
//@access    PRIVATE
router.put('/:id', async (req, res) => {
    const {
        sprname,
        taskname,
        taskdescription,
        tasksummary,
        taskpriority,
        taskassignee,
        taskreporter,
        taskstartdate,
        taskenddate,
        taskprogress
    } = req.body;

    //Build contact fields
    const tasksFields = {};
    if (sprname) tasksFields.sprname = sprname;
    if (taskname) tasksFields.taskname = taskname;
    if (taskdescription) tasksFields.taskdescription = taskdescription;
    if (tasksummary) tasksFields.tasksummary = tasksummary;
    if (taskpriority) tasksFields.taskpriority = taskpriority;
    if (taskassignee) tasksFields.taskassignee = taskassignee;
    if (taskreporter) tasksFields.taskreporter = taskreporter;
    if (taskstartdate) tasksFields.taskstartdate = taskstartdate;
    if (taskenddate) tasksFields.taskenddate = taskenddate;
    if (taskprogress) tasksFields.taskprogress = taskprogress;
    try {
        let tasks = await Tasks.findById(req.params.id);
        if (!tasks) res.status(404).json({ msg: 'Not Found' });

        tasks = await Tasks.findByIdAndUpdate(
            req.params.id,
            {
                $set: tasksFields,
            },
            { new: true }
        );

        res.json(tasks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});



//@Route     DELETE /api/question/:id
//@Desc      Delete questions
//@access    PRIVATE
router.delete('/:id', async (req, res) => {
    try {
        let tasks = await Tasks.findById(req.params.id);
        if (!tasks) res.status(404).json({ msg: 'Not Found' });

        await Tasks.findByIdAndRemove(req.params.id);

        res.json({ msg: 'Task Deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
