'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let methodOverride = require('method-override');
/** global variables **/
global.rootdir = __dirname;
global.logger   = require('./routes/logger/logger').logger('./logs/'+workerId+'.log');

/** DB init **/
/**  i18n **/

let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());

let index = require('./routes/index');
app.all( '*', function( req, res, next ){
	logger.info('ip: ', ( req.headers[ 'x-forwarded-for' ] ) ? ( req.headers[ 'x-forwarded-for' ] ) : req.ip);
	next();
});

app.use('/', index );

app.use(function (req, res) {
		res.status(404);
		logger.info('404 Warning. URL: ' + req.url);
		// Respond with json
		// if (req.accepts('json')) {
		// 	return res.json({ error: 'Not found!' });
		// }

		// Default to plain-text. send()
		res.type('txt').send('Error: Not found!');
});

module.exports = app;
