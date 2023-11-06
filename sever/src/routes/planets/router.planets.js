const express = require('express');
const app = require('../../app');

const {
    httpgetAllPlanets,
} = require('./controller.planets');

const planetsRouter = express.Router();

planetsRouter.get('/',httpgetAllPlanets);

module.exports = planetsRouter;