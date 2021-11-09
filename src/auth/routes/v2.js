
'use strict';

const express = require('express');
const bearerAuth = require('../middleware/bearer.js')
const dataModules = require('../models/index');
const acl = require('../middleware/acl');
const apiRouter = express.Router();



apiRouter.param('model', (req, res, next) => {
  const modelName = req.params.model;
  if (dataModules[modelName]) {
    req.model = dataModules[modelName];
    next();
  } else {
    next('Invalid Model');
  }
});

apiRouter.get('/:model',bearerAuth, acl('read'), handleGetAll);
apiRouter.get('/:model/:id', bearerAuth, acl('read'),handleGetOne);
apiRouter.post('/:model', bearerAuth, acl('create'),handleCreate);
apiRouter.put('/:model/:id', bearerAuth, acl('update'),handleUpdate);
apiRouter.delete('/:model/:id', bearerAuth, acl('delete'),handleDelete);


async function handleGetAll(req, res) {
    let allRecords = await req.model.get();
    res.status(200).json(allRecords);
  }
  
  async function handleGetOne(req, res) {
    const id = req.params.id;
    let theRecord = await req.model.get(id)
    res.status(200).json(theRecord);
  }
  
  async function handleCreate(req, res) {
    let obj = req.body;
    let newRecord = await req.model.create(obj);
    res.status(201).json(newRecord);
  }
  
  async function handleUpdate(req, res) {
    const id = req.params.id;
    const obj = req.body;
    let updatedRecord = await req.model.update(id, obj)
    res.status(200).json(updatedRecord);
  }
  
  async function handleDelete(req, res) {
    let id = req.params.id;
    let deletedRecord = await req.model.delete(id);
    res.status(200).json(deletedRecord);
  }
  

  module.exports = apiRouter;  
