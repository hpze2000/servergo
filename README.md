ServerGo 快速的把一个目录/当前目录变为静态文件服务器
==============================

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
$ webhere -p 5000
```

```shell
#create a web server in the /home directory with port 5000
$ webhere -p 5000 -d /home
```

```shell
#don't open browser
$ webhere -s
```