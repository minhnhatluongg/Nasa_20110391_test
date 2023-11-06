const express = require('express');
const {launches} = require('../../models/model.launches');
const { httpgetAllLaunches,httpAddNewLaunch, httpAbortLaunch } = require('./controller.launches');
const launchesRouter = express.Router();

launchesRouter.get('/',httpgetAllLaunches);
launchesRouter.post('/',httpAddNewLaunch);
launchesRouter.delete('/:id',httpAbortLaunch);

module.exports = launchesRouter;