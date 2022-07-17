const app = require("./server");
require("dotenv/config");
const api = process.env.API_URL;

app.listen(process.env.PORT || 4000, function () {
  console.log(api);
  console.log(
    "EVENT SEATING APP SERVER IS LISTENING FOR REQUESTS ON PORT 4000"
  );
});
