const router = require("express").Router();
const pkg    = require("./package.json");
const mailer = require("./mailer");

router.get("/", sendIdent);
router.post("/", sendEmail);

module.exports = router;

function sendEmail(req, res, next) {

  const data = req.body?.data?.data || req.body?.data || req.body;
  const attachments = req.body?.data?.included || req.body?.included || [];

  mailer.sendMessage({ data, attachments }, function (err, next) {
    // console.log(JSON.stringify(data));
    res.status(200).send();
  });
}

function sendIdent(req, res, next) {
  res.send(pkg.description);
}
