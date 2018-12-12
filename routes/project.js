const express = require('express');
const mongoose = require('mongoose');
const Project = require('../models/Project');

const router = express.Router();

//C (create a new project)
// router

router.post('/projects', (req, res, next) => {
  Project.create({
    title: req.body.title,
    description: req.body.description,
    tasks: []
  })
    .then(response => {
      res.json(response);
    })
    .catch(e => console.log(e));
})


//R (read all the projects)
router.get('/projects', (req, res, next) => {
  Project.find().populate('tasks')
    .then(allProjects => {
      res.json(allProjects);
    })
    .catch(e => console.log(e));
});

//(read an specific project)
router.get('/projects/:id', (req, res, next)=>{
  if(!mongoose.Types.ObjectId.isValid(req.params.id)){
    res.status(400).json({ message: 'Specified id is not valid' })
    return;
  }

  Project.findById(req.params.id).populate('tasks')
    .then(response => {
      res.status(200).json(response)
    })
    .catch(e=>console.log(e))
})


//U (update an specific project)
router.put('/projects/:id', (req, res, next) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)){
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Project.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({ message: `Project with ${req.params.id} is updated successfully.`});
    })
    .catch(e=> console.log(e))
})


//D

router.delete('/projects/:id', (req, res, next) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)){
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Project.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({ message: `Project with ${req.params.id} is removed successfully.` });
    })
    .catch(e => console.log(e))
})

module.exports =  router;