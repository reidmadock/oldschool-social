const { connect, connection } = require('mongoose');

const connectionStr = process.env.MONGODB_URI;

connect(connectionStr);

module.exports = connection;