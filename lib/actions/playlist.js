var utils = require('radiodan-client').utils;

module.exports = function(radio, options) {
  return radio.sendCommands([['playlistinfo']])
    .then(function(playlistInfo) {
      var playlistArray = radio.formatResponse(playlistInfo, true),
          playlist = formatPlaylist(playlistArray);

      return utils.promise.resolve(playlist);
    });
};

function formatPlaylist(playlist) {
  var output = [],
      playlistItem = {};

  playlist.forEach(function(line) {
    var key = line[0], value = line[1];

    if(key == 'file' && playlistItem.hasOwnProperty('file')) {
      output.push(playlistItem);
      playlistItem = {};
    }

    playlistItem[key] = value;
  });

  if(playlistItem != {}) {
    output.push(playlistItem);
  }

  return output;
}