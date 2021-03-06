/* globals describe, it, before */
'use strict';

var chai = require('chai'),
    assert = chai.assert,
    chaiAsPromised = require('chai-as-promised'),
    sinon  = require('sinon'),
    winston = require('winston'),
    fs     = require('fs'),
    EventEmitter = require('events').EventEmitter;

var utils = require('radiodan-client').utils;

chai.use(chaiAsPromised);

var subject = require('../../lib/actions/simple-command');

describe('simple-command action wrapper', function() {


  it('sends a single command only', function() {
    var radio = { sendCommands: sinon.spy() },
        command = 'myCommand';

    subject(command)(radio, {});

    assert.ok(radio.sendCommands.calledWith([
        ['myCommand']
    ]));
  });

  it('doesn\'t do anything with options', function() {
    var radio = { sendCommands: sinon.spy() };

    subject('mycommand')(radio, {value: 999999});

    assert.ok(radio.sendCommands.calledWith([
        ['mycommand']
    ]));
  });
});

