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
          data = data.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/g);
          if (data.length) {
            data = data[matchIndex];
          }
        }

        options['result'] = data;
        options['time'] = Date.now();
        callback(null, options);
      } else {
        callback(error);
      }
    });
}

exports.whatismyip = whatismyip;
