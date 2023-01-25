const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'},
];

// routes

// do get responses

app.get('/', (req, res) => {
    res.send('hello world');
});

app.get('/api/courses', (req, res) => {
    res.send(courses); 
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course){ 
        res.status(404).send('The course with the given ID was not found.');
        return;
    }
    else {
        res.send(course);
    }
})

// do a post respons

app.post('/api/courses', (req, res) => {
  
    // validates the values that comes from the response
    const { error } = validateCourse(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const course = {
        id: courses.length +1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

// do a put response

app.put('/api/courses/:id', (req, res) => {
    
    // checks if there is a course with the given id
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course){ 
        res.status(404).send('The course with the given ID was not found.');
        return;
    }

    // validates the values that comes from the response
    const { error } = validateCourse(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    course.name = req.body.name;
    res.send(course);
});

function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    
    return schema.validate(course);
}

// do a delete request

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course){ 
        res.status(404).send('The course with the given ID was not found.');
        return;
    }

    // delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});


// PORT
const port = process.env.PORT || 3000; // will listen to PORT inn production, but for now we are listening to 3000 locally

app.listen(port, () => console.log(`listening on port ${port}`));