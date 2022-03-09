const app = require ('./server');
require('dotenv/config');
const api = process.env.API_URL;


app.listen(4000, function() {
        console.log(api);
        console.log("EVENT SEATING APP SERVER IS LISTENING FOR REQUESTS ON PORT 4000");
    });