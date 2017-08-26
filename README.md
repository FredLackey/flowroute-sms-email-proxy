# flowroute-sms-email-proxy

## Options:

## General Settings
NODE_PORT: (default 3000)
MOCK_DOMAIN: (default flowroute.com) Placeholder domain of mock sending email address

### Outbound Settings
SMTP_HOST: Outgoing SMTP server
SMTP_PORT: (default 587)
SMTP_SECURE: (default false)
SMTP_USER: Username or email address for outbound mailing
SMTP_PASS: Password for outbound mailing

### Recipient Settings
TO_NAME: (optional) Cosmetic name of destination email recipient
TO_EMAIL: Destination email address (required if TO_DOMAIN is not set)
TO_DOMAIN: Destination domain for wildcard recipients (required if TO_EMAIL is not set)

~~~

## Contact Info & Status

This project was whipped up out of neccessity for something I needed.  Feel free to use it.  Send any bugs or feature requests to me at:

Fred Lackey
fred.lackey@gmail.com



