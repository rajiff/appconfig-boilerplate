const config = require('../appconfig');

function getHello() {
	return config.APP_NAME;
}

module.exports = {
	getHello
}