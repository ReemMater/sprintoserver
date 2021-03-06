const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

//done

//don1
//connect database
connectDB();

//init middleware
app.use(express.json({ extended: false }));

<<<<<<< HEAD
//Define Routes
app.all((req, res, next) => {

  res.header('Acces-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Acces-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
  next();
});
=======
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});


//Define Routes
>>>>>>> 7355dd164a95e422de50e7aadff39fcf1e6a9c8f
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/sprints', require('./routes/sprints'));
app.use('/api/tasks', require('./routes/tasks'));
app.use('/api/subtasks', require('./routes/subtasks'));
app.use('/api/issues', require('./routes/issues'));

const PORT = process.env.PORT || 3000;

// const cors = require("cors");
// const corsOptions = {
//   methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH', 'OPTIONS'],
//   origin: '*',
//   credentials: true,            //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
//   // 'Acces-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE',
//   // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept", 'Acces-Control-Allow-Origin': '*'
// }

// app.use(cors(corsOptions));


app.listen(PORT, () => {
  console.log(`server start in ${PORT}`);
});
