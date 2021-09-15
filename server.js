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

//Define Routes
app.all((req, res, next) => {

  res.header('Acces-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Acces-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
  next();
});
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
