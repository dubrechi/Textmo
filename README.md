[![Build Status](https://travis-ci.org/dubrechi/textmo.svg?branch=master)](https://travis-ci.org/dubrechi/textmo)
[![Coverage Status](https://coveralls.io/repos/github/dubrechi/textmo/badge.svg?branch=master)](https://coveralls.io/github/dubrechi/textmo?branch=master)
[![Code Climate](https://codeclimate.com/github/dubrechi/textmo/badges/gpa.svg)](https://codeclimate.com/github/dubrechi/textmo)
[![npm version](https://badge.fury.io/js/textmo.svg)](https://www.npmjs.com/package/textmo)
[![dependencies Status](https://david-dm.org/dubrechi/textmo/status.svg)](https://david-dm.org/dubrechi/textmo)
[![Known Vulnerabilities](https://snyk.io/test/github/dubrechi/textmo/badge.svg)](https://snyk.io/test/github/dubrechi/textmo)
[![NSP Status](https://nodesecurity.io/orgs/dubrechi/projects/24d15426-854c-4bcb-9c86-b2c5b68240f5/badge)](https://nodesecurity.io/orgs/dubrechi/projects/24d15426-854c-4bcb-9c86-b2c5b68240f5)

# textmo
A simple hapijs plugin for sending sms. Uses [nexmo](https://github.com/Nexmo/nexmo-node).

## Installation
```bash
npm install textmo
```

## Usage
```js
const TextMo = require('textmo');
const server = new Hapi.Server();

const textMoConfig = {
    apiKey: 'safgd2143sgs',
    apiSecret: 'zx1j2h3g4g1jk',
    options: {}
};

server.register({
    register: TextMo,
    options: {
        config: textMoConfig
    }
});
```
* `apiKey` - API Key from [Nexmo](https://www.nexmo.com/)
* `apiSecret` - API SECRET from [Nexmo](https://www.nexmo.com/)
* `options` - Additional options for the constructor

Options are:

```js
{
  // If true, log information to the console
  debug: true|false,
  // append info the the User-Agent sent to Nexmo
  // e.g. pass 'my-app' for /nexmo-node/1.0.0/4.2.7/my-app
  appendToUserAgent: string,
  // Set a custom logger
  logger: {
    log: function() {level, args...}
    info: function() {args...},
    warn: function() {args...}
  }
}
```

## Sending sms message
```js
const smsConfig = {
    sender: 'Adam',
    recipient: '639183345789',
    message: 'Do not eat the fruit',
    options: {}
};

request.server.plugins.textmo.send(smsConfig, (err, res) => {

    if (err) {
        console.log(err);

            return reply(err)
    }

    return reply(res);
});
```
* `options` - parameter is optional. See [SMS API Reference](https://docs.nexmo.com/messaging/sms-api/api-reference#request)

## Contributing
* Include 100% test coverage.
* Follow the [Hapi coding conventions](http://hapijs.com/styleguide)
* Submit an issue first for significant changes
