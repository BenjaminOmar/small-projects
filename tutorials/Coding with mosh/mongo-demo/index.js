const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

mongoose
	.connect("mongodb://localhost/playground")
	.then(() => console.log("connected to mongoDB..."))
	.catch((err) => console.error("could not connecto to mongoDB, err"));

// post to databse

const courseSchema = new mongoose.Schema({
	name: String,
	author: String,
	tags: [String],
	date: { type: Date, default: Date.now },
	isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
	const course = new Course({
		name: "angular Course",
		author: "Mosh",
		tags: ["angular", "frontend"],
		isPublished: true,
	});

	const result = await course.save();
	console.log(result);
}

// createCourse();

// get to databse
async function getCourses() {
	const courses = await Course.find();
	console.log(courses);
}

getCourses();
