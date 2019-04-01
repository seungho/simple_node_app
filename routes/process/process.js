'use strict';
const cp = require('child_process');
const moment = require('moment');
const TAG = '[process]';

exports.forkFile = ( forkFile, params, callback )=>{ // pid쪽은 options로 빼도 될듯.
    logger.info('on forkFile');
    const child = cp.fork(forkFile);
    child.on('message', function(m) {
        child.send('exit');
        if (m.result !== 'OK')
            return callback( m.result );
        return callback( null, m.result );
    });

    return child.send(params);
};

exports.spawn = function( sid, cmd, cb ){
    logger.debug("on process.spawn", cmd);
    cmd = cmd.split( ' ' );

    let p = require('child_process').spawn( cmd[0] , cmd.slice(1) );
    let data = '';
    let err = '';
    p.stdout.on( 'data', ( result ) => { data += result;} );
    p.stderr.on( 'data', ( result ) => { err += result;} );
    // p.stdout.on( 'end', () => { logger.info( TAG, 'end::' + cmd ); });

    // when the spawn child process exits
    let now = new Date();
    p.on( 'exit', ( code ) => {
        let duration = new Date() - now;
        logger.info( TAG, moment().format("YYYY-MM-DD HH:mm:ss.SSS"), 'sid:', sid, 'cmd:', cmd, 'code:', code, ', duration:', duration, 'ms\n' );
        if ( code !== 0 ) return cb( err );
        cb( null, data );
    });
};

exports.runPy = () => {

}