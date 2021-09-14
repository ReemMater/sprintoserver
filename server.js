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

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/sprints', require('./routes/sprints'));
app.use('/api/tasks', require('./routes/tasks'));
app.use('/api/subtasks', require('./routes/subtasks'));
app.use('/api/issues', require('./routes/issues'));

const PORT = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.setHeader('Acces-Control-Allow-Origin', '*');
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader('Acces-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  res.setHeader('Acces-Contorl-Allow-Methods', { 'Content-Type': "application/json" }, 'Authorization');
  next();
});
app.use(cors({
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));
const cors = require("cors");
const corsOptions = {
  origin: '*',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}

app.use(cors(corsOptions));

app.listen(PORT, () => {
  console.log(`server start in ${PORT}`);
});
