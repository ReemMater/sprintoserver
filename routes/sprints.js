const express = require('express');

const router = express.Router();
const Sprints = require('../models/Sprints');
const { check, validationResult } = require('express-validator');

const auth = require('../middleware/auth');

//@Route     GET /api/question
//@Desc      Get questions
//@access    PRIVATE
router.get('/', async (req, res) => {
    try {
        const sprints = await Sprints.find();
        res.json(sprints);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/:name', async (req, res) => {
    try {
        const sprints = await Sprints.findOne({ sprintname: req.params.name });
        res.json(sprints);
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
            check('proname').not().isEmpty(),
            check('sprintname').not().isEmpty(),
            check('sprintdescription').not().isEmpty(),
            check('sprintsummary').not().isEmpty(),
            check('sprintstartdate').not().isEmpty(),
            check('sprintenddate').not().isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            proname,
            sprintname,
            sprintdescription,
            sprintsummary,
            sprintstartdate,
            sprintenddate
        } = req.body;

        try {
            const newSprints = new Sprints({
                proname,
                sprintname,
                sprintdescription,
                sprintsummary,
                sprintstartdate,
                sprintenddate,
                sprintstates: "InProgress"
            });

            let sprints = await newSprints.save();
            res.json(sprints);
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
        proname,
        sprintname,
        sprintdescription,
        sprintsummary,
        sprintstartdate,
        sprintenddate,
        sprintstates
    } = req.body;

    //Build contact fields
    const sprintsFields = {};
    if (proname) sprintsFields.proname = proname;
    if (sprintname) sprintsFields.sprintname = sprintname;
    if (sprintdescription) sprintsFields.sprintdescription = sprintdescription;
    if (sprintsummary) sprintsFields.sprintsummary = sprintsummary;
    if (sprintstartdate) sprintsFields.sprintstartdate = sprintstartdate;
    if (sprintenddate) sprintsFields.sprintenddate = sprintenddate;
    if (sprintstates) sprintsFields.sprintstates = sprintstates;
    try {
        let sprints = await Sprints.findById(req.params.id);
        if (!sprints) res.status(404).json({ msg: 'Not Found' });

        sprints = await Sprints.findByIdAndUpdate(
            req.params.id,
            {
                $set: sprintsFields,
            },
            { new: true }
        );

        res.json(sprints);
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
        let sprints = await Sprints.findById(req.params.id);
        if (!sprints) res.status(404).json({ msg: 'Not Found' });

        await Sprints.findByIdAndRemove(req.params.id);

        res.json({ msg: 'Sprint Deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
