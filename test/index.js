'use strict';

const Hapi = require('hapi');
const Lab = require('lab');
const proxyquire = require('proxyquire');
const lab = exports.lab = Lab.script();
const beforeEach = lab.beforeEach;
const describe = lab.describe;
const { expect, it } = lab;

const internals = {
    error: null,
    res: {},
    smsConfig: {
        sender: 'Adam',
        recipient: '639363912365',
        message: 'Don not eat the fruit',
        options: {}
    },
    init: () => {

        internals.server = new Hapi.Server();
    }
};


const TextMo = proxyquire('../lib', {
    nexmo: function () {

        this.message = {
            sendSms: (sender, recipient, message, options, next) => {

                return next(internals.error, internals.res);
            }
        };
    }
});

internals.register = (options) => {

    return internals.server.register({
        plugin: TextMo,
        options: options
    });
};

describe('Registering the plugin', () => {

    beforeEach(() => {

        internals.init();

    });

    it('Should return error given there is no given config', () => {

        const options = {};

        internals.register(options)
            .catch(function (err) {

                expect(err).to.exist();

            });
    });

    it('Should create registration with the use of default config', () => {

        const options = {
            config: {
                apiKey: '6db4b234',
                apiSecret: 'b72f98f6b8c77bdc',
                options: {}
            }
        };

        internals.register(options)
            .then(function () {
            });
    });
});

describe('Sending text message', () => {

    it('Should send a text message', () => {

        internals.server.plugins.textmo.send(internals.smsConfig)
            .then(function (res) {

                expect(res).to.exist();
            });
    });

    it('Should send a text message synchronously', () => {

        internals.server.plugins.textmo.send(internals.smsConfig)
            .then(function (res) {

                expect(res).to.exist();
            });
    });

    it('Should throw error', () => {

        internals.error = {};
        internals.res = null;

        internals.server.plugins.textmo.send({}).catch(function (err) {

            expect(err).to.exist();
        });
    });
});
