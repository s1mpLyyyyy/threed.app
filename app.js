const express = require("express");
const app = express();
const port = 3000;

// routers
const v1Routes = require("./routers.js");

// content-type: json package
const bodyParser = require("body-parser");

// parse application/json
app.use(bodyParser.json());

app.use("/api", v1Routes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
