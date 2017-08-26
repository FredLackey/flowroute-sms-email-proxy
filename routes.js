var express = require('express'),
    router  = express.Router(),
    pkg     = require('./package.json'),
    mailer  = require('./mailer');

router.get('/', sendIdent);
router.post('/', sendEmail);

module.exports = router;

function sendEmail(req, res, next){
    mailer.sendMessage(req.body, function(err, next){
        console.log(JSON.stringify(req.body));
        res.status(200).send();
    });
}

function sendIdent(req, res, next){
    res.send(pkg.description);
}

