const http = require('http');
const app = require('./app');
const PORT = process.env.PORT || 8000;
const { loadPlannetsData } = require('./models/model.planets');
const server = http.createServer(app);


async function startSever() {
    await loadPlannetsData();

    server.listen(PORT, () =>{
        console.log(`Listen on Port ${PORT} .. `);
    });
}
startSever();
// const app = express();
// app.listen();
console.log(PORT);