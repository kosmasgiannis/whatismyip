#!/usr/bin/env node

const { program } = require('commander');
const util = require('util');
const ip = require('../lib/whatismyip.js');
const _package = require('../package.json');

function list(val) {
  return val.split(',');
}

program
  .version(_package.version)
  .option('-a, --all', 'Hit all servers')
  .option('-u, --urls <list>', 'A comma separated list of urls of servers to lookup', list)
  .option('-6, --ipv6', 'Check for ipv6 address')
  .option('-v, --verbose', 'Be verbose')
  .parse(process.argv);

const opts = program.opts();

var hosts = [];

if (opts.urls) {
  opts.urls.forEach(function(u) {
    hosts.push({'url' : u, 'truncate' : '', 'matchIndex' : 0});
  });
} else {
  if (opts.ipv6) {
    hosts = [
      {url:'http://ipv6.whatismyv6.com/', truncate:''},
      {url:'https://v6.ifconfig.co/ip', truncate:''},
      {url:'https://icanhazip.com', truncate:''},
      {url:'https://ident.me', truncate:''},
      {url:'https://curlmyip.net', truncate:''}
    ];
  } else {
    hosts = [
      {url:'https://ipinfo.io/ip/', truncate:''},
      {url:'https://ipecho.net/plain', truncate:''},
      {url:'https://ipaddr.site', truncate:''},
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

var host = '';
var options = {};
const func = (opts.ipv6 === true) ? ip.whatismyipv6 : ip.whatismyipv4;
for (var hostId in hosts) {
  host = hosts[hostId]
  options = {
    url: host['url'],
    truncate: host['truncate'],
    matchIndex: host['matchIndex']
  };

  func(options, function(err, data){
    if (!err) {
      if (opts.verbose) {
        console.log('From '+data.url+' : '+((data.ip) ? data.ip : 'not resolved,')+' time taken : ', data.time - start);
      } else {
        if (data.ip) {
          console.log(data.ip);
        } else {
          console.warn('Could not resolve ip from the specified host(s).')
        }
      }
      if ((! opts.all) || (!opts.all && ! opts.verbose)) {
        process.exit();
      }
    } else {
      if (opts.verbose) {
        console.log('From '+data.url+' : '+((data.ip) ? data.ip : 'not resolved,')+' time taken : ', data.time - start, 'Error:', util.inspect(data.error,{depth:null}));
      }
    }
  });
}

process.on('SIGINT', function () {
    console.log('\nBye!\n');
    process.exit(0);
});
