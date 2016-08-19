ServerGo 快速的把一个目录/当前目录变为静态文件服务器
==============================

[![NPM version](https://img.shields.io/npm/v/servergo.svg?style=flat)](https://npmjs.org/package/servergo)
[![Build Status](https://travis-ci.org/smallyard/servergo.svg?branch=master)](https://travis-ci.org/smallyard/servergo)
[![NPM downloads](http://img.shields.io/npm/dm/servergo.svg?style=flat)](https://npmjs.org/package/servergo)


Running static file server anywhere. 
## Installation
```
npm install servergo -g
```

## Usage
```shell
#create a web server in the current directory with default port 8000
$ servergo
```

```shell
#create a web server with port 5000
$ servergo -p 5000
```

```shell
#create a web server in the /home directory with port 5000
$ servergo -p 5000 -d /home
```

```shell
#don't open browser
$ servergo -s
```

## All options
```
Usage: servergo [options]
Options:
   --help                   output usage information  
   -V, --version            output the version number
   -h, --hostname           hostname of web
   -p, --port <n>           port of web (default 9000)
   -d, --dir <path>         base path of web (default .)
   -s, --silent             silent mode, don't open browser
```