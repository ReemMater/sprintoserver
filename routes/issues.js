const express = require('express');

const router = express.Router();
const Issues = require('../models/Issues');
const { check, validationResult } = require('express-validator');

const auth = require('../middleware/auth');

//@Route     GET /api/question
//@Desc      Get questions
//@access    PRIVATE
router.get('/:name', async (req, res) => {
    try {
        const issues = await Issues.findOne({ issuename: req.params.name });
        res.json(issues);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


router.get('/', async (req, res) => {
    try {
        const issues = await Issues.find();
        res.json(issues);
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
            check('issuename').not().isEmpty(),
            check('issuedescription').not().isEmpty(),
            check('issuesummary').not().isEmpty(),
            check('issuepriority').not().isEmpty(),
            check('issueassignee').not().isEmpty(),
            check('issuereporter').not().isEmpty(),
            check('issuestartdate').not().isEmpty(),
            check('issueenddate').not().isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            sprname,
            issuename,
            issuedescription,
            issuesummary,
            issuepriority,
            issueassignee,
            issuereporter,
            issuestartdate,
            issueenddate
        } = req.body;

        try {
            const newIssues = new Issues({
                sprname,
                issuename,
                issuedescription,
                issuesummary,
                issuepriority,
                issueassignee,
                issuereporter,
                issuestartdate,
                issueenddate,
                issueprogress: "ToDo"
            });

            let issues = await newIssues.save();
            res.json(issues);
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
        issuename,
        issuedescription,
        issuesummary,
        issuepriority,
        issueassignee,
        issuereporter,
        issuestartdate,
        issueenddate,
        issueprogress
    } = req.body;

    //Build contact fields
    const issuesFields = {};
    if (sprname) issuesFields.sprname = sprname;
    if (issuename) issuesFields.issuename = issuename;
    if (issuedescription) issuesFields.issuedescription = issuedescription;
    if (issuesummary) issuesFields.issuesummary = issuesummary;
    if (issuepriority) issuesFields.issuepriority = issuepriority;
    if (issueassignee) issuesFields.issueassignee = issueassignee;
    if (issuereporter) issuesFields.issuereporter = issuereporter;
    if (issuestartdate) issuesFields.issuestartdate = issuestartdate;
    if (issueenddate) issuesFields.issueenddate = issueenddate;
    if (issueprogress) issuesFields.issueprogress = issueprogress;
    try {
        let issues = await Issues.findById(req.params.id);
        if (!issues) res.status(404).json({ msg: 'Not Found' });

        issues = await Issues.findByIdAndUpdate(
            req.params.id,
            {
                $set: issuesFields,
            },
            { new: true }
        );

        res.json(issues);
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
        let issues = await Issues.findById(req.params.id);
        if (!issues) res.status(404).json({ msg: 'Not Found' });

        await Issues.findByIdAndRemove(req.params.id);

        res.json({ msg: 'Issues Deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
