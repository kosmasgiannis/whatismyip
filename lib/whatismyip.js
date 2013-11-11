var request = require('request');

var truncations = function (data, truncate) {
    if ( Object.prototype.toString.call( truncate ) === '[object Array]' ) {
      truncate.forEach(function(t) {
        data = data.replace(t,'').trim();
      });
      return data;
    } else {
      return data.replace(truncate, '').trim();
    }
}

var whatismyip = function whatismyip(options, callback) {
    if (typeof options['timeout'] == 'undefined') {
      options['timeout'] = 30000;
    }
    request(options, function (error, response, body) {
      var data = '';
      if (!error && response.statusCode == 200) {
        data = body;
        var matchIndex = 0;
        if (typeof options['matchIndex'] !== 'undefined') {
          matchIndex = options['matchIndex'];
        }
                
        data = truncations(data, options['truncate'] || '');

        if (matchIndex >= 0) {
          data = data.match(/\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/g);
          if (data && data.length && matchIndex < data.length) {
            data = data[matchIndex];
          } else {
            data = null;
          }
        }

        options['ip'] = data;
        options['time'] = Date.now();
        callback(null, options);
      } else {
        callback("Failed to get IP address");
      }
    });
}

exports.whatismyip = whatismyip;
