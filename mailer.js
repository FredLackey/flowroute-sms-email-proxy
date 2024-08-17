const nodemailer = require("nodemailer");
const moment     = require("moment");

const SMTP_HOST   = process.env.SMTP_HOST || "smtp.1and1.com";
const SMTP_PORT   = parseInt(process.env.SMTP_PORT || "587");
const SMTP_SECURE = (process.env.SMTP_SECURE || "").toLowerCase() === "true";
let   SMTP_USER   = process.env.SMTP_USER;
let   SMTP_PASS   = process.env.SMTP_PASSWORD || process.env.SMTP_PASS;
const SEND_ID     = (process.env.SEND_ID || "").toLowerCase()     === "true";

const MOCK_DOMAIN = process.env.MOCK_DOMMAIN || "flowroute.com";
const TO_NAME     = process.env.TO_NAME;
const TO_EMAIL    = process.env.TO_EMAIL;
const TO_DOMAIN   = process.env.TO_DOMAIN;
const FROM_NAME     = process.env.FROM_NAME;
const FROM_EMAIL    = process.env.FROM_EMAIL;

SMTP_USER = SMTP_USER ? SMTP_USER : undefined;
SMTP_PASS = SMTP_PASS ? SMTP_PASS : undefined;

const AUTH = { user: SMTP_USER, pass: SMTP_PASS };
if (!SMTP_USER && SMTP_PASS) {
  AUTH = undefined;
}

const transport = nodemailer.createTransport({
  host  : SMTP_HOST,
  port  : SMTP_PORT,
  secure: SMTP_SECURE,   // secure:true for port 465, secure:false for port 587
  auth  : AUTH,
});

module.exports = {
  sendMessage: sendMessage,
};

function sendMessage({data, attachments}, next) {

  const { attributes: attr, body } = data;
  attachments = [].concat(attachments || []).filter(x => x && x.id);

  const from        = FROM_NAME || [attr.from, attr.to].join("-").split('+').join('');
  const fromAddress = `${FROM_EMAIL}`.trim() || from + " <" + from + "@" + MOCK_DOMAIN + ">";

  const date    = moment().format("YYYY-MM-DD HH:mm:ss [GMT]ZZ");
  const subject = [attr.from, attr.to].join("-").split('+').join('') + " @ " + date;

  const options = {
    from   : fromAddress,
    to     : getToAddress(data),
    subject: subject,
    text   : getMessage(data, attachments),
    html   : getMessage(data, attachments, true),
  };

  transport.sendMail(options, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log("Message %s sent: %s", info.messageId, info.response);
      console.log(JSON.stringify(options, null, 2));
    }
    next();
  });
}

function getMessage(data, attachments, htmlFormat) {
  let body = SEND_ID ? data.id : "";
  if (body) {
    body += ": ";
  }
  body   += (data.attributes.body || "").trim() ? data.attributes.body: "(EMPTY MESSAGE)";
  
  if (htmlFormat) {

    const result = [
      "<!DOCTYPE html>",
      "<html>",
      "<head>",
      '  <meta charset="UTF-8">',
      "</head>",
      "<body>",
      "  %LINES%",
      "</body>",
      "</html>",
    ].join('');

    let lines = [];

    body.split("\n").filter(x => x && x.trim().length > 0).forEach(line => {
      lines.push(`<p>${line}</p>`);
    })

    if (result.length === 0) {
      lines.push("<p>(EMPTY MESSAGE)</p>");
    }

    attachments.forEach(attachment => {
      const url = attachment.attributes.url;
      const name = attachment.attributes.file_name;
      const isImage = attachment.attributes.mime_type.startsWith("image/");
      if (isImage) {
        lines.push(`<img src="${url}" alt="${name}" style="max-width: 100%;"><br>`);
      } else {
        lines.push(`<a href="${url}">${name}</a><br>`);
      }
    })

    return result.replace("%LINES%", lines.join(''));
    // body = body.split("\n").join("<br>");
  }
  
  return body;

  // return htmlFormat ? "<pre>" + body + "</pre>" : body;
}
function getToAddress(data) {

  const to = data.attributes.to.split("+").join("");

  if (TO_EMAIL && TO_NAME) {
    return TO_NAME + " <" + TO_EMAIL + ">";
  } else if (TO_EMAIL) {
    return TO_EMAIL;
  } else if (TO_DOMAIN) {
    return to + " <" + to + "@" + TO_DOMAIN + ">";
  } else {
    throw "TO_EMAIL or TO_DOMAIN must be specified!";
  }
}
