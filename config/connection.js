const { connect, connection } = require('mongoose');

connect('mongodb://localhost/SocialMedia', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
