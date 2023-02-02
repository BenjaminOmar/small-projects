// initiating the application
const express = require("express");
const app = express();
app.use(express.json());

const genres = require("./routes/genres");

app.use("/api/genres", genres);

// configuring port
const port = process.env.PORT || 3000;
app.listen(port);
