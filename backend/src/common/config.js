var convict = require('convict');

convict.addFormat(require('convict-format-with-validator').ipaddress);
convict.addFormat(require('convict-format-with-validator').url);

// Define a schema
var config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'test'],
    default: 'test',
    env: 'NODE_ENV'
  },
  ip: {
    doc: 'The IP address to bind.',
    format: 'ipaddress',
    default: '127.0.0.1',
    env: 'IP_ADDRESS',
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 3001,
    env: 'PORT',
    arg: 'port'
  },
  datamuse: {
    address: {
      doc: 'Base URL for datamuse',
      format: 'url',
      default: 'https://api.datamuse.com'
    }
  }
});

// Load environment dependent configuration
var env = config.get('env');
config.loadFile('./config/' + env + '.json');

// Perform validation
config.validate({allowed: 'strict'});

module.exports = config;