# flowroute-sms-email-proxy  

## Local Usage  

    TO_DOMAIN=batmail.com SMTP_PASS=brucenrobin SMTP_USER=bruce@batcave.com SMTP_HOST=smtp.batcave.com node ./server.js

... or ...

    TO_EMAIL=bruce@batcave.com SMTP_PASS=brucenrobin SMTP_USER=bruce@batcave.com SMTP_HOST=smtp.batcave.com node ./server.js

## Docker Usage  

    docker run --name test -p 3000:3000 \
        -e TO_DOMAIN=batmail.com \
        -e SMTP_PASS=brucenrobin \
        -e SMTP_USER=bruce@batcave.com \
        -e SMTP_HOST=smtp.batcave.com 
        fredlackey/flowroute-proxy  

... or ...  

    docker run --name test -p 3000:3000 \
        -e TO_EMAIL=bruce@batcave.com \
        -e SMTP_PASS=brucenrobin \
        -e SMTP_USER=bruce@batcave.com \
        -e SMTP_HOST=smtp.batcave.com 
        fredlackey/flowroute-proxy  

## Settings  

### General Settings  
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

#### `TO_DOMAIN` vs `TO_EMAIL` Settings  
In most scenarios, the `TO_EMAIL` is desired.  When used, all incoming SMS messages will be sent to this one single address.  The `TO_DOMAIN` setting is used for "wildcard forwarding" or "catchall" domains and is helpful when sorting email messages by sender.  When used, all messages will be sent to a fictitious email address at that domain.  It is your responsibility to ensure every possible email address at that domain is received.  In the examples above, when using the `TO_DOMAIN` (as shown in the first examples) an SMS message sent to `14075551212` will be sent via email to `14075551212@batmail.com`.  

---  

## Contact Info & Status  

This project was whipped up out of neccessity for something I needed.  Feel free to use it.  Send any bugs or feature requests to me at:  

Fred Lackey  
fred.lackey@gmail.com  



