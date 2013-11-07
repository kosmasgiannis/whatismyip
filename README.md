# whatismyip

Node.js package to provide the current public IP address from remote IP lookup servers.

###Use it in your own application

####Installation
    > npm install whatismyip

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

####Installation

    > npm install -g whatismyip

####Usage

#####Get your IP address from any predefined server

    $ whatismyip

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
