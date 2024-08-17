const bodyParser = require("body-parser");
const express    = require("express");
const morgan     = require("morgan");
const path       = require("path");
const routes     = require("./routes");
const pkg        = require("./package.json");

const PORT = process.env.NODE_PORT || 3000;

const app = express();
app.use(morgan("tiny"));

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use(routes);

listen();

function listen() {
  app.listen(PORT, function () {
    console.log("**********");
    console.log(pkg.description);
    console.log("TIME     : %s", new Date());
    console.log("PORT     : %s", PORT);
    console.log("CWD      : %s", process.cwd());

    console.log("TO DOMAIN: %s", process.env.TO_DOMAIN);
    console.log("TO EMAIL : %s", process.env.TO_EMAIL);
    console.log("TO NAME  : %s", process.env.TO_NAME);
    
    console.log("FROM EMAIL : %s", process.env.FROM_EMAIL);
    console.log("FROM NAME  : %s", process.env.FROM_NAME);

    console.log("SMTP HOST: %s", process.env.SMTP_HOST);
    console.log("SMTP USER: %s", process.env.SMTP_USER);
    console.log("SMTP PASS: %s", process.env.SMTP_PASS);
    console.log("SMTP PORT: %s", process.env.SMTP_PORT);

    console.log("MOCK DOM : %s", process.env.MOCK_DOMAIN);

    console.log("**********");
  });
}
