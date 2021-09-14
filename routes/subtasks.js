const express = require('express');

const router = express.Router();
const Subtasks = require('../models/Subtasks');
const { check, validationResult } = require('express-validator');

const auth = require('../middleware/auth');

//@Route     GET /api/question
//@Desc      Get questions
//@access    PRIVATE
router.get('/', async (req, res) => {
    try {
        const subtasks = await Subtasks.find();
        res.json(subtasks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
router.get('/:name', async (req, res) => {
    try {
        const subtasks = await Subtasks.findOne({ subtaskname: req.params.name });
        res.json(subtasks);
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
            check('subtaskname').not().isEmpty(),
            check('subtaskdescription').not().isEmpty(),
            check('subtasksummary').not().isEmpty(),
            check('subtaskpriority').not().isEmpty(),
            check('subtaskassignee').not().isEmpty(),
            check('subtaskreporter').not().isEmpty(),
            check('subtaskstartdate').not().isEmpty(),
            check('subtaskenddate').not().isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            sprname,
            subtaskname,
            subtaskdescription,
            subtasksummary,
            subtaskpriority,
            subtaskassignee,
            subtaskreporter,
            subtaskstartdate,
            subtaskenddate,
        } = req.body;

        try {
            const newSubtasks = new Subtasks({
                sprname,
                subtaskname,
                subtaskdescription,
                subtasksummary,
                subtaskpriority,
                subtaskassignee,
                subtaskreporter,
                subtaskstartdate,
                subtaskenddate,
                subtaskprogress: "ToDo"
            });

            let subtasks = await newSubtasks.save();
            res.json(subtasks);
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
        subtaskname,
        subtaskdescription,
        subtasksummary,
        subtaskpriority,
        subtaskassignee,
        subtaskreporter,
        subtaskstartdate,
        subtaskenddate,
        subtaskprogress
    } = req.body;

    //Build contact fields
    const subtasksFields = {};
    if (sprname) subtasksFields.sprname = sprname;
    if (subtaskname) subtasksFields.subtaskname = subtaskname;
    if (subtaskdescription) subtasksFields.subtaskdescription = subtaskdescription;
    if (subtasksummary) subtasksFields.subtasksummary = subtasksummary;
    if (subtaskpriority) subtasksFields.subtaskpriority = subtaskpriority;
    if (subtaskassignee) subtasksFields.subtaskassignee = subtaskassignee;
    if (subtaskreporter) subtasksFields.subtaskreporter = subtaskreporter;
    if (subtaskstartdate) subtasksFields.subtaskstartdate = subtaskstartdate;
    if (subtaskenddate) subtasksFields.subtaskenddate = subtaskenddate;
    if (subtaskprogress) subtasksFields.subtaskprogress = subtaskprogress;
    try {
        let subtasks = await Subtasks.findById(req.params.id);
        if (!subtasks) res.status(404).json({ msg: 'Not Found' });

        subtasks = await Subtasks.findByIdAndUpdate(
            req.params.id,
            {
                $set: subtasksFields,
            },
            { new: true }
        );

        res.json(subtasks);
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
        let subtasks = await Subtasks.findById(req.params.id);
        if (!subtasks) res.status(404).json({ msg: 'Not Found' });

        await Subtasks.findByIdAndRemove(req.params.id);

        res.json({ msg: 'Subtask Deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
