const dbDebugger = require("debug")("app:db");
const startupDebugger = require("debug")("app:startup");
const config = require("config");
const Joi = require("joi");
const express = require("express");
const app = express();
const courses = require("./routes/courses");
const root = require("./routes/root");

// imported middleware functions
const logger = require("./middleware_functions/logger");
const auth = require("./middleware_functions/auth");
const helmet = require("helmet");
const morgan = require("morgan");

app.use("/api/courses", courses);
app.use("/", root);
app.use(express.json()); // install a middleware function with app.use. express.json populated the req.body with json format.
// app.use(express.urlencoded()); - this is deprecated approach.
// app.use(express.static('foldername')); - serves a static file from the spesific folder
app.use(helmet()); // helps secure apps by setting various HTTP headers

// configuration
console.log("Application Name: " + config.get("name"));
console.log("Mail server name: " + config.get("mail.host"));
// console.log('Mail passoword: ' + config.get('mail.password'));

if (app.get("env") === "development") {
	// checks if the environment is set to development
	app.use(morgan("tiny")); // HTTP request logger. Logs the response in the console
	startupDebugger("Morgan enabled...");
}

// debugger for database example
dbDebugger("connected to the database...");

// self made middelware functions
app.use(logger);
app.use(auth);

// PORT
const port = process.env.PORT || 3000; // will listen to PORT inn production, but for now we are listening to 3000 locally

app.listen(port, () => console.log(`listening on port ${port}`));
