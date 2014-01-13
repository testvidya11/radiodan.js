var Q = require('Q'),
    childProcess = require('child_process');

function processPath(exec) {
  var exec = exec ||  Q.denodeify(childProcess.exec);
  var deferred = Q.defer();

  function handleDone(stdout, stderr) {
    var location = stdout[0].trim().replace(/\n$/, '');
    deferred.resolve(location);
  }

  function handleError(error) {
    deferred.reject(error);
  }

  exec('which mpd').done(handleDone, handleError);

  return deferred.promise;
}

module.exports = {
  processPath: processPath,
  create: function create(configFilepath, spawn) {
    var spawn = spawn || childProcess.spawn;
    var dfd = Q.defer();

    this.processPath().then(function (path) {
      spawn(path, [configFilepath, '--no-daemon']);
      dfd.resolve();
    });

    return dfd.promise;
  }
};