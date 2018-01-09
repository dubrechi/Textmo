'use strict';

const Nexmo = require('nexmo');
const internals = {};

internals.send = function (options) {

    return new Promise((resolve, reject) => {

        internals.nexmo.message.sendSms(options.sender, options.recipient, options.message, options.options, (err, res) => {

            if (err) {

                reject(err);
            }

            resolve(res);
        });
    });
};

exports.plugin = {
    name: 'textmo',
    register: function (server, options) {
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
            throw new Error(err);
        }
    },
    pkg: require('../package.json')
};
