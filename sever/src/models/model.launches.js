const launches = new Map();
let lastestFlightNumber = 100;
const launch = {
    flightNumber: 100,
    mission:'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27,2030'),
    target : 'Kepler-422 b',
    customer: ['ZTM','NASA'],
    upcoming:true,
    success:true,
};
launches.set(launch.flightNumber,launch);


function existsLaunchWithId(launchId){
    return launches.has(launchId);
}

function getAllLaunches(){
    return Array.from(launches.values());
}
function addNewLaunches(launch){
    lastestFlightNumber++;
    launches.set(
        lastestFlightNumber,
        Object.assign(launch, {
            success:true,
            upcoming:true,
            customer:['Zero to Mastery', 'NASA'],
            flightNumber: lastestFlightNumber,
        })
    );
}

function abortLaunchById(launchId){
    const aborted = launches.get(launchId);
    aborted.upcoming = false;
    aborted.success = false;
    return aborted;
}
module.exports = {
    existsLaunchWithId,
    getAllLaunches,
    addNewLaunches,
    abortLaunchById,
}