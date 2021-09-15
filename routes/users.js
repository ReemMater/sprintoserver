const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

//@Route     POST /api/users
//@Desc      Register a user
//@access    PUBLIC
router.post(
  '/',
  [
    check('name', 'Name is require').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter password with 8 or more characters'
    ).isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      const { name, email, password } = req.body;
      try {
        let user = await User.findOne({ email });
        if (user) {
          return res.status(400).json({ msg: 'user already exist' });
        }

        user = new User({ name, email, password, notifications: [] });

        //encrpt password

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
          user: {
            id: user.id,
          },
        };
        jwt.sign(
          payload,
          config.get('jwtSecret'),
          {
            expiresIn: 36000,
          },
          (err, token) => {
            if (err) throw err;
            res.json(token);
          }
        );
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  }
);
// const cors = require("cors");
// const corsOptions = {
//   methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH', 'OPTIONS'],
//   origin: '*',
//   credentials: true,            //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
//   // 'Acces-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE',
//   // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept", 'Acces-Control-Allow-Origin': '*'
// }
router.get('/', async (req, res) => {
  try {
    let user = await User.find();

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// app.use(cors(corsOptions));
router.get('/:email', async (req, res) => {
  try {
    let user = await User.findOne({ email: req.params.email });
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }

});

router.put('/:email', async (req, res) => {
  const { notname, notdescription } = req.body;
  const userFields = { notname, notdescription };

  try {
    let user = await User.findOne({ email: req.params.email });
    if (!user) res.status(404).json({ msg: 'Not Found' });

    user = await User.findOneAndUpdate({ email: req.params.email }, {
      $push: { notifications: userFields },
    });

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
