var nodemailer  = require('nodemailer'),
    moment      = require('moment');

var SMTP_HOST = process.env.SMTP_HOST || 'smtp.1and1.com';
var SMTP_PORT = parseInt(process.env.SMTP_PORT || '587');
var SMTP_SECURE = ((process.env.SMTP_SECURE || '').toLowerCase() === 'true');
var SMTP_USER = process.env.SMTP_USER;
var SMTP_PASS = process.env.SMTP_PASSWORD || process.env.SMTP_PASS;
var SEND_ID = ((process.env.SEND_ID || '').toLowerCase() === 'true');

var MOCK_DOMAIN = process.env.MOCK_DOMMAIN || 'flowroute.com';
var TO_NAME = process.env.TO_NAME;
var TO_EMAIL = process.env.TO_EMAIL;
var TO_DOMAIN = process.env.TO_DOMAIN;

SMTP_USER = SMTP_USER ? SMTP_USER : undefined;
SMTP_PASS = SMTP_PASS ? SMTP_PASS : undefined;

var AUTH = { user: SMTP_USER, pass : SMTP_PASS };
if (!SMTP_USER && SMTP_PASS) { AUTH = undefined; }

var transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_SECURE, // secure:true for port 465, secure:false for port 587
    auth: AUTH
});

module.exports = {
    sendMessage : sendMessage
};

function sendMessage(data, next){
    var from        = [ data.from, data.to ].join('-');
    var fromAddress = from + ' <' + from + '@' + MOCK_DOMAIN + '>';

    //var date        = moment().locale('en').toString('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
    var date        = moment().format('YYYY-MM-DD HH:mm:ss [GMT]ZZ');
    var subject     = [ data.from, data.to ].join('-') + ' @ ' + date;

    var options = {
        from    : fromAddress,
        to      : getToAddress(data),
        subject : subject,
        text    : getMessage(data),
        html    : getMessage(data, true)
    };

    transport.sendMail(options, function(err, info){
        if (err) {
            console.log(err);
        } else {
            console.log('Message %s sent: %s', info.messageId, info.response);
        }
        next();
    });
}

function getMessage(data, htmlFormat){
    var body = SEND_ID ? data.id : '';
    if (body) { body += ': ' }
    body += (data.body || '').trim() ? data.body : '(EMPTY MESSAGE)';
    return htmlFormat ? ('<pre>' + body + '</pre>') : body;
}
function getToAddress(data){
    if (TO_EMAIL && TO_NAME) {
        return TO_NAME + ' <' + TO_EMAIL + '>';
    } else if (TO_EMAIL) {
        return TO_EMAIL;
    } else if (TO_DOMAIN) {
        return data.to + ' <' + data.to + '@' + TO_DOMAIN + '>';
    } else {
        throw 'TO_EMAIL or TO_DOMAIN must be specified!';
    }
}
