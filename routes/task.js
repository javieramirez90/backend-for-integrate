const express = require('express');
const mongoose = require('mongoose');
const Task = require('../models/Task');
const Project = require('../models/Project');

const router = express.Router();

//C (create a task and update the project)

router.post('/tasks', (req, res, next) => {
  Task.create({
    title: req.body.title,
    description: req.body.description,
    project: req.body.projectID
  })
    .then(response => {
      Project.findByIdAndUpdate(req.body.projectID, { $push:{ tasks: response._id } })
      .then(response => {
        res.json(response)
      })
      .catch(e=>console.log(e));
    })
    .catch(e=>console.log(e));
})
//R
//U (update an specific task)
router.put('/tasks/:id', (req, res, next)=> {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Task.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json( { message: `Task with ${req.params.id} is updated successfully.` } )
    })
    .catch(e=>console.log(e));
})


//D

router.delete('/tasks/:id', (req, res, next) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Task.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({ message: `Task with ${req.params.id} is removed successfully.` });
    })
    .catch(err => {
      res.json(err);
    })
})

module.exports = router;