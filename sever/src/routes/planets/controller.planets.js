const {getAllPlanets} = require('../../models/model.planets');

function httpgetAllPlanets (req,res) {
    return res.status(200).json(getAllPlanets());
}

module.exports = {
    httpgetAllPlanets,
}