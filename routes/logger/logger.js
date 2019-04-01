'use strict';
/***
* app.locals.sysLogger = new wlogger( 'scs.log' )
* app.locals.getLogger() = function( pid ){ sysLogger.getLogger( pid )}
* app.locals.logFormat() = function( pid, user, message ) { pid + '_' + user + ': ' + message }
* getLogger( pid ).debug( logFormat( pid, user, message ) )
**/

let winston = require('winston');
let moment = require('moment');
let chalk = require('chalk');
function loggerOpt( filename, level ) {
    let logger = new (winston.Logger)({
		levels: { emerg: 0, alert: 1, crit: 2, error: 3, warning: 4, notice: 5, info: 6, debug: 7 },
		colors: {
			emerg: 'red',
			alert: 'yellow',
			crit: 'magenta',
			error: 'red',
			warning: 'red',
			notice: 'yellow',
			info: 'green',
			debug: 'blue'
		}
	});
	
	logger.add(winston.transports.Console, {
			level : level, // Winston console log level
			colorize: true,
			prettyPrint: true,
			silent: false,
			timestamp: function(){
					return moment().format("YYYY-MM-DD HH:mm:ss.SSS");
			}/*,
			formatter: function(options) {
					// Return string will be passed to logger.
					return chalk.green( options.timestamp() ) + ' ' +
						winston.config.colorize( options.level,options.level.toUpperCase() + ') ' +  
						(undefined !== options.message ? options.message : '') +
						(options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' ));
			}*/
	});

	logger.add(winston.transports.File, {
		level : 'debug',
		json : false, 
		filename: filename,
		prettyPrint: false,
		timestamp: function(){
			return moment().format("YYYY-MM-DD HH:mm:ss.SSS");
		}
		//maxsize: 40000,
		//maxFiles: 10,
	});

	return logger;
}

function addLogger( username ){
        return winston.loggers.add( username , loggerOpt( username ) );
}

exports.getLogger = function( username ){
        if( typeof winston.loggers.get( username ) !== 'undefined' && winston.loggers.get( username ) !== null ) return winston.loggers.get( username );
        else addLogger( username );
};

exports.logger = function( filename ) {
	let level='debug';
	if(process.env.NODE_ENV === 'production' ){
		level='info'
	}
	return loggerOpt( filename, level );
}

// module.exports = logger;
//TypeError: object is not a function
// exports.validator = require('validator');
