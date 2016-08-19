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
    var ipregex = ((options.ipv6) && (options.ipv6 === true)) ? /\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*/g
                  : /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/g;
    request(options, function (error, response, body) {
      var data = '';
      options['time'] = Date.now();
      if (!error && response.statusCode == 200) {
        data = body.replace(/(\r\n)|(\n)/g,'');;
        var matchIndex = 0;
        if (typeof options['matchIndex'] !== 'undefined') {
          matchIndex = options['matchIndex'];
        }
                
        data = truncations(data, options['truncate'] || '');

        if (matchIndex >= 0) {
          data = data.match(ipregex);
          if (data && data.length && matchIndex < data.length) {
            data = data[matchIndex];
          } else {
            data = null;
          }
        }

        options['ip'] = data;
        callback(null, options);
      } else {
        options['error'] = error;
        callback("Failed to get IP address", options);
      }
    });
}

var whatismyipv4 = function whatismyipv4(options, callback) {
    options['ipv4'] = true;
    whatismyip(options, callback);
}

var whatismyipv6 = function whatismyipv6(options, callback) {
    options['ipv6'] = true;
    whatismyip(options, callback);
}

exports.whatismyip = whatismyip;
exports.whatismyipv4 = whatismyipv4;
exports.whatismyipv6 = whatismyipv6;
