const { connect, connection } = require('mongoose');

const connectionStr = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/networkDB';

connect(connectionStr);

module.exports = connection;