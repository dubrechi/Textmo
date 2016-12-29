'use strict';

const Nexmo = require('nexmo');
const internals = {};

internals.send = function (options, next) {
    internals.nexmo.message.sendSms(options.sender, options.recipient, options.message, options.options, (err, res) => {

        if (err) {

            return next(err);
        }

        if (!next) {

            return res;
        }

        return next(null, res);
    });
};


exports.register = (server, options, next) => {
    try {
        if (options.config) {
            internals.nexmo = new Nexmo(options.config);
        }
        else {
            throw new Error('Please provide a proper configuration');
        }

        server.expose('send', internals.send);
    }
    catch (err) {

        return next(err);
    }

    return next();
};


exports.register.attributes = {
    pkg: require('../package.json')
};
