
log = (req, res, next) => { // make a custom middleware function
    console.log('logging...');
    next(); // have to use next() in order to initiate the next middleware function in the path
}

module.exports = log;