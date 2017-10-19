var assert = require('assert'),
  webdriver = require('selenium-webdriver'),
  conf_file = process.argv[3] || 'conf/single.conf.js';
  
var caps = require('../' + conf_file).capabilities;

var buildDriver = function(caps) {
  return new webdriver.Builder().
    usingServer('https://hub-cloud.browserstack.com/wd/hub').
    withCapabilities(caps).
    build();
};

describe('Google\'s Search Functionality for ' + caps.browserName, function() {
  this.timeout(0);
  var driver, bsLocal;

  beforeEach(function(done) {
    driver = buildDriver(caps);
    done();
  });

  it('can find search results', function (done) {
    driver.get('https://app.dragonlaw.io').then(function() {
          driver.getTitle().then(function(title) {
            assert(title.match(/Login - Dragon Law/i) != null);
            done();
          });
    });
  });

  afterEach(function(done) {
    driver.quit().then(function() {
      done();
    });
  });
});
