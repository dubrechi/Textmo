'use strict';

const Hapi = require('hapi');
const Code = require('code');
const Lab = require('lab');
const proxyquire = require('proxyquire');

const lab = exports.lab = Lab.script();
const beforeEach = lab.beforeEach;
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;

const internals = {
    error: null,
    res: {},
    smsConfig: {
        sender: 'Adam',
        recipient: '639183345789',
        message: 'Don not eat the fruit',
        options: {}
    },
    init: () => {

        internals.server = new Hapi.Server();
        internals.server.connection();
        internals.server.initialize();
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

internals.register = (options, next) => {

    internals.server.register({
        register: TextMo,
        options: options
    }, (err) => {

        return next(err);
    });
};

describe('Registering the plugin', () => {

    beforeEach((done) => {

        internals.init();

        return done();
    });

    it('Should return error given there is no given config', (done) => {

        const options = {};

        internals.register(options, (err) => {

            expect(err).to.exist();

            return done();
        });
    });

    it('Should create registration with the use of default config', (done) => {

        const options = {
            config: {
                apiKey: '4e388fd8',
                apiSecret: '28cbb8339fdb7ddd',
                // applicationId: '',
                // privateKey: '',
                options: {}
            }
        };

        internals.register(options, (err) => {

            expect(err).to.not.exist();

            return done();
        });
    });
});

describe('Sending text message', () => {

    it('Should send a text message', (done) => {

        internals.server.plugins.textmo.send(internals.smsConfig, (err, res) => {

            expect(err).to.not.exist();
            expect(res).to.exist();

            return done();
        });
    });

    it('Should send a text message synchronously', (done) => {

        expect(internals.server.plugins.textmo.send(internals.smsConfig)).to.not.exist();

        return done();
    });

    it('Should throw error', (done) => {

        internals.error = {};
        internals.res = null;

        internals.server.plugins.textmo.send({}, (err, res) => {

            expect(err).to.exist();
            expect(res).to.not.exist();

            return done();
        });
    });
});
