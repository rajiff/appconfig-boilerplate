const router = require('express').Router();
const myCtrl = require('./mymodule.controller');

router.get('/hello', (req, res) => {
	try{
		res.send(myCtrl.getHello());
	} catch(err) {
		console.log('Error: ', err);
		res.status(500).send({error: 'Internal error..!'});
	}
})

module.exports = router;