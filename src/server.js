var os = require('os');
var http = require("http");
var https = require("https");
var exec = require("child_process").exec;
var router = require("./router");
var render = require("./render");

function start(options) {
    function onRequest(request, response) {
        var routeResult = router.route(request.url, options.dir);
        var responseInfo = render.getResponseInfo(routeResult);
        response.writeHead(responseInfo.status, {
            "Content-Type": responseInfo.contentType,
            "Access-Control-Allow-Origin": "*"
        });
        response.write(responseInfo.content);
        response.end();
    }

    var hostname = options.hostname || getIPAddress();
    http.createServer(onRequest).listen(options.port);
    console.log("Server has started.");
    var address = "http://" + hostname + ":" + options.port;
    console.log("Server address: " + address);
    if (!options.silent) {
        openBrowser(address);
    }
}

/**
 * Get ip(v4) address
 * @return {String} the ipv4 address or 'localhost'
 */
function getIPAddress() {
    var ifaces = os.networkInterfaces();
    var ip = '';
    for (var dev in ifaces) {
        ifaces[dev].forEach(function (details) {
            if (ip === '' && details.family === 'IPv4' && !details.internal) {
                ip = details.address;
                return;
            }
        });
    }
    return ip || "127.0.0.1";
};

/**
 * open browser
 * @return null
 */
function openBrowser(url) {
    try {
        switch (process.platform) {
            case "darwin":
                exec("open " + url);
                break;
            case "win32":
                exec("start " + url);
                break;
            default:
                spawn("xdg-open", [url]);
        }
    } catch (e) {
        console.log("Can't open browser, cause by: " + e)
    }
};

exports.start = start;