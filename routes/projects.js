const express = require('express');

const router = express.Router();
const Projects = require('../models/Projects');
const { check, validationResult } = require('express-validator');

const auth = require('../middleware/auth');

//@Route     GET /api/question
//@Desc      Get questions
//@access    PRIVATE
router.get('/', async (req, res) => {
  try {
    const projects = await Projects.find();
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
router.get('/:name', async (req, res) => {
  try {
    const projects = await Projects.findOne({ projectname: req.params.name });
    res.json(projects);
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
      check('projectname').not().isEmpty(),
      check('projectdescription').not().isEmpty(),
      check('projectsummary').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }

    const {
      projectname,
      projectdescription,
      projectsummary
    } = req.body;
    console.log(req.body)
    try {
      const newProjects = new Projects({
        projectname,
        projectdescription,
        projectsummary,
      });

      let projects = await newProjects.save();
      res.json(projects);
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
    projectname,
    projectdescription,
    projectsummary
  } = req.body;

  //Build contact fields
  const projectsFields = {};
  if (projectname) projectsFields.projectname = projectname;
  if (projectdescription) projectsFields.projectdescription = projectdescription;
  if (projectsummary) projectsFields.projectsummary = projectsummary;
  try {
    let projects = await Projects.findById(req.params.id);
    if (!projects) res.status(404).json({ msg: 'Not Found' });

    projects = await Projects.findByIdAndUpdate(
      req.params.id,
      {
        $set: projectsFields,
      },
      { new: true }
    );

    res.json(projects);
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
    let projects = await Projects.findById(req.params.id);
    if (!projects) res.status(404).json({ msg: 'Not Found' });

    await Projects.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Project Deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
