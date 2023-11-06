const request = require('supertest');
const assert = require('assert');
const app = require('../../app');


//Get All Launches Test 
describe('GET all Launches', () =>{
    it('Should be return status 200 and list launches', async () => {
        const response = await request(app).get('/launches');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
        for (const launch of response.body){
            expect(launch.mission).toBeDefined();
            expect(launch.rocket).toBeDefined();
            expect(launch.launchDate).toBeDefined();
            expect(launch.target).toBeDefined();
            expect(launch.customer).toBeDefined();
        }
    })
})
//Post Launches Test 
describe('Post Launches', () => {
  it('Should return status code 201 if create success', async () =>{
    const newLaunch = {
      mission:'Test Mission',
      rocket: 'Test Rocket',
      launchDate: '2030-12-26T17:00:00.000Z',
      target : 'Test Rocket',
    };
    const response = await request(app)
      .post('/launches')
      .send(newLaunch);

    expect(response.status).toBe(201);
    expect(response.body.mission).toBe(newLaunch.mission);
    expect(response.body.rocket).toBe(newLaunch.rocket);
    expect(response.body.launchDate).toBe(newLaunch.launchDate);
    expect(response.body.target).toBe(newLaunch.target);
  });

  //Return status 400 if failed 
  it('Should be return status 400 if missing required properties', async () => {
    const response = await request(app)
      .post('/launches')
      .send({});
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Missing required launch property');
  })

  //launchDate Invalid 
  it('Should be return 400 if launchDate is invalid', async () => {
    const response = await request(app)
      .post('/launches')
      .send({
        mission:'Invalid mission',
        rocket: 'Invalid Rocket',
        launchDate: 'Invalid Date',
        target : 'Invalid Rocket',
      });
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Invalid launch date');
  })
})
//Delete Launche
describe('Delele /launches/:id', () => {
  it('Should be return status 200 if delete succces', async () => {
    //Choose flightNumber already
    const flightNumberToAbort = 100;

    const response = await request(app)
      .delete(`/launches/${flightNumberToAbort}`); // /launches/100
    expect(response.status).toBe(200);
    expect(response.body.upcoming).toBe(false);
    expect(response.body.success).toBe(false);
  });
  it('Should be return 404 for a non-existing launches(id)', async () =>{
    //Choose flightNumber non-existing 
    const nonExistingflightNumber = 999;
    
    const response = await request(app)
      .delete(`/launches/${nonExistingflightNumber}`);
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Launch not found');
  })
})

