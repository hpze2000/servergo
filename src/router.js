var fs = require("fs");
var path = require("path");


function route(url, basePath) {
    if (url == "/") {
        if (fs.existsSync(path.join(basePath, '/index.html'))) {
            return {
                status: 200,
                filePath: path.join(basePath, '/index.html')
            };
        }

        return renderDefaultPage(url, basePath);
    } else {
        var filePath = path.join(basePath, url);
        if (fs.existsSync(filePath)) {
            if (fs.statSync(filePath).isFile()) {
                return {
                    status: 200,
                    filePath: filePath
                };
            } else {
                return renderDefaultPage(url, filePath);
            }
        } else {
            return {
                status: 404,
                filePath: path.join(__dirname, "./html/404.html")
            };
        }
    }
}

/**
 * when the url is directory, render directory structure
 * @return route 
 */
function renderDefaultPage(url, basePath) {
    var dirs = fs.readdirSync(basePath), objDirs = [], dirContent = [];
    for (var i = 0; i < dirs.length; i++) {
        if (fs.statSync(path.join(basePath, dirs[i])).isFile()) {
            objDirs.push({
                isFile: true,
                name: dirs[i]
            });
        } else {
            objDirs.push({
                isFile: false,
                name: dirs[i]
            });
        }
    }
    objDirs = objDirs.sort(function (a, b) {
        return a.isFile;
    });

    dirContent.push('<ul>');
    for (var j = 0; j < objDirs.length; j++) {
        if (objDirs[j].isFile) {
            dirContent.push('<li class="file"><a href="' + (url.substring(url.length - 1) === '/' ? url : url + '/') + objDirs[j].name + '">' + objDirs[j].name + '</a></li>');
        } else {
            dirContent.push('<li class="dir">' + objDirs[j].name + '</li>');
        }
    }
    dirContent.push('</ul>');

    var tempFile = path.join(__dirname, "./html/index.html");
    var content = fs.readFileSync(tempFile).toString();

    return {
        status: 200,
        filePath: tempFile,
        content: content.replace('{content}', dirContent.join('\n'))
    };
}

exports.route = route;