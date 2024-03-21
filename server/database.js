
const path = require('path');

const Datastore = require('nedb');

const db = new Datastore({ 
    filename: path.join(__dirname, "database/user.db"), 
    autoload: true 
});

module.exports = { db };