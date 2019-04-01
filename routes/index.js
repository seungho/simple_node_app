'use strict';

const router = require('express').Router();
// const asyncHandler = require('express-async-handler');
const p = require(rootdir + '/routes/process/process.js');

router.get('/', getTest);
router.get('/get-test/:id', getTest);
router.get('/get-test', getQuery);


router.post('/post-test/:id', postTest);
router.post('/post-test/:id/:pwd', postTest1);
router.post('/post-body/', postBody);

/**
 *  curl http://localhost:3000
 *  curl http://localhost:3000/get-test/1
 * @param req
 * @param res
 */
function getTest(req, res) {
	let params = req.params;
    logger.info('on getTest', req.sessionID, p);

	let cmd = 'python ' + rootdir + '/routes/process/test.py '+ params.id;
	p.spawn(req.sessionID, cmd, (err, result)=> {
        if(err) return res.status(500).json({err:err});
		return res.status(200).send(result)
	});
}

/**
 *  curl 'http://localhost:3000/get-test?p=1&pwd2'
 * @param req
 * @param res
 */
function getQuery(req, res) {
    let params = req.query;
    logger.info('on getQuery', req.sessionID, p);

    let cmd = 'python ' + rootdir + '/routes/process/test.py '+ params.id;
    p.spawn(req.sessionID, cmd, (err, result)=> {
        if(err) return res.status(500).json({err:err});
        return res.status(200).send(result)
    });
}

/**
 *  curl -X POST http://localhost:3000/post-test/1
 * @param req
 * @param res
 */
function postTest(req, res) {
    let p = req.params;
    logger.info('on postTest', p);
    res.status(200).send('post request');
}

/**
 *  curl -X POST http://localhost:3000/post-test/1/2
 * @param req
 * @param res
 */
function postTest1(req, res) {
    let p = req.params;
    logger.info('on postTest1', p);
    res.status(200).json({result:'post request'});
}

/**
 *  curl -X POST -d 'id=1&pwd=2' http://localhost:3000/post-body
 * @param req
 * @param res
 */
function postBody(req, res) {
    let p = req.body;
    logger.info('on postBody', p);
    res.status(200).json({result:'post request'});
}

module.exports = router;
