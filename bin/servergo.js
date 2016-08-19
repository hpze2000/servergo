var server = require("../src/server");
var package = require("../package");

var argv = require("minimist")(process.argv.slice(2), {
  alias: {
    'silent': 's',
    'port': 'p',
    'hostname': 'h',
    'dir': 'd',
    'log': 'l'
  },
  string: ['port', 'hostname', 'fallback'],
  boolean: ['silent', 'log'],
  'default': {
    'port': 8000,
    'dir': process.cwd()
  }
});

if (argv.V) {
  console.log("Version: " + package.version);  
  process.exit(0);
}

if (argv.help) {
  console.log("Usage:");
  console.log("  servergo --help // print help information");
  console.log("  servergo // 8000 as default port, current folder as root");
  console.log("  servergo 8888 // 8888 as port");
  console.log("  servergo -p 8989 // 8989 as port");
  console.log("  servergo -s // don't open browser");
  console.log("  servergo -h localhost // localhost as hostname");
  console.log("  servergo -d /home // /home as root");
  console.log("  servergo -l // print log");
  process.exit(0);
}

server.start(argv);

