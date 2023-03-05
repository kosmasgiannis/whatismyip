#!/usr/bin/env node

var program = require('commander');
var util = require('util');
var ip = require('../lib/whatismyip.js');

function list(val) {
  return val.split(',');
}

program
  .version('0.0.1')
  .option('-a, --all', 'Hit all servers')
  .option('-u, --urls <list>', 'A comma separated list of urls of servers to lookup', list)
  .option('-6, --ipv6', 'Check for ipv6 address')
  .option('-v, --verbose', 'Be verbose')
  .parse(process.argv);

var hosts = [];

if (program.urls) {
  program.urls.forEach(function(u) {
    hosts.push({'url' : u, 'truncate' : '', 'matchIndex' : 0});
  });
} else {
  if (program.ipv6) {
    hosts = [
      {url:'http://ipv6.whatismyv6.com/', truncate:''},
      {url:'https://v6.ifconfig.co/ip', truncate:''}
    ];
  } else {
    hosts = [
      {url:'https://api.ipify.org/', truncate:''},
      {url:'https://ip.seeip.org/', truncate:''},
      {url:'https://ifconfig.me/ip', truncate:''},
      {url:'http://checkip.amazonaws.com/', truncate:''},
      {url:'http://checkip.dyndns.org/', truncate:[/^.*Current IP Address: /, /<.*$/]},
      {url:'http://whatismyip.oceanus.ro/myip.php', truncate:'', matchIndex:1},
      {url:'http://showip.net/', truncate:''},
      {url:'http://www.showmemyip.com/', truncate:''},
      {url:'https://api.myip.com/', truncate:''}

    ];
  }
}


var start = Date.now();

for (var hostId in hosts) {
  var host = hosts[hostId]
  var options = {
        url: host['url'],
        truncate: host['truncate'],
        matchIndex: host['matchIndex']
      };

  var func = (program.ipv6 === true) ? ip.whatismyipv6 : ip.whatismyipv4;
  func(options, function(err, data){
    if (!err) {
      if (program.verbose) {
        console.log('From '+data.url+' : '+((data.ip) ? data.ip : 'not resolved,')+' time taken : ', data.time - start);
      } else {
        if (data.ip) {
          console.log(data.ip);
        } else {
          console.warn('Could not resolve ip from the specified host(s).')
        }
      }
      if ((! program.all) || (!program.all && ! program.verbose)) {
        process.exit();
      }
    } else {
      if (program.verbose) {
        console.log('From '+data.url+' : '+((data.ip) ? data.ip : 'not resolved,')+' time taken : ', data.time - start, 'Error:', util.inspect(data.error,{depth:null}));
      }
    }
  });
}

process.on('SIGINT', function () {
    console.log('\nBye!\n');
    process.exit(0);
});
