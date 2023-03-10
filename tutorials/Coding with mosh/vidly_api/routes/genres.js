const express = require("express");
const router = express.Router();
const Joi = require("joi");

// empty genre array

const genres = [{ id: 1, name: "genre1" }];

// validation function

function validateGenre(genre) {
	const schema = Joi.object({
		name: Joi.string().min(3).required(),
	});
	return schema.validate(genre);
}

// get all genres

router.get("/", (reg, res) => {
	res.send(genres);
});

// get one genre

router.get("/:id", (req, res) => {
	const genre = genres.find((g) => g.id === parseInt(req.params.id));
	if (!genre)
		return res.status(404).send("The genre with the given id was not found");
	else res.send(genre);
});

// add a genre

router.post("/", (req, res) => {
	// validate that the values from the response are legal
	const { error } = validateGenre(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	// this will come from the database at a later date
	const genre = {
		id: genre.length + 1,
		name: req.body.name,
	};

	// sends the newly created genre to the endpoint
	genres.push(genre);
	res.send(genre);
});

// changes the name of a given genre

router.put("/:id", (req, res) => {
	// checks if there is a genre with the spesific id
	const genre = genres.find((g) => g.id === parseInt(req.params.id));
	if (!genre)
		return res.status(404).send("The genre with the given id was not found");

	// checks our validation
	const { error } = validateGenre(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	// changes the name from the request body and sends it back into the endpoint
	genre.name = req.body.name;
	res.send(genre);
});

// deletes a spesific genre based on the id

router.delete("/:id", (req, res) => {
	// checks if there is a genre with the spesific id
	const genre = genres.find((g) => g.id === parseInt(req.params.id));
	if (!genre)
		return res.status(404).send("The genre with the given id was not found");

	// deletes the genre with the spesific id
	const index = genres.indexOf(genre);
	genres.splice(index, 1);

	// sends the deletion back to the endpoint
	res.send(genre);
});

module.exports = router;
