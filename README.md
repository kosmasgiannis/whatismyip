# whatismyip

Node.js package to provide the current public IP address from remote IP lookup servers.

##Installation

[![Dependency Status](https://gemnasium.com/kosmasgiannis/whatismyip.png)](https://gemnasium.com/kosmasgiannis/whatismyip)

[![NPM](https://nodei.co/npm/whatismyip.png)](https://nodei.co/npm/whatismyip/)

###Use it in your own application

####Usage

    var ip = require('whatismyip');
    var options = {
      url: 'http://checkip.dyndns.org/',
      truncate: '',
      timeout: 60000,
      matchIndex: 0
    };

    ip.whatismyip(options, function(err, data){
      if (err === null) {
        console.log(data);
      }
    });

###Use as standalone application

####Usage

#####Get your IP address from any predefined server

    $ whatismyip

#####Get your IPv6 address

    $ whatismyip -6

or

    $ whatismyip --ipv6

#####Get your IP address as well as the server that responded first and the time taken to serve the request.

    $ whatismyip -v

or

    $ whatismyip --verbose

#####Get your IP address from all predefined servers

    $ whatismyip -av

or

    $ whatismyip --all --verbose

#####Get Help

    $ whatismyip --help
