const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  // 先去掉查询参数
  let urlPath = req.url;
  const queryIndex = urlPath.indexOf('?');
  if (queryIndex !== -1) urlPath = urlPath.substring(0, queryIndex);
  
  // 根路径返回index.html
  let filePath = urlPath === '/' || urlPath === '' ? 'index.html' : urlPath;
  filePath = path.join(__dirname, filePath);
  
  console.log('Request:', req.url, '->', filePath);
  
  const ext = path.extname(filePath);
  const types = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.css': 'text/css'
  };
  
  res.setHeader('Content-Type', types[ext] || 'application/octet-stream');
  
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not Found: ' + filePath);
    } else {
      res.writeHead(200);
      res.end(data);
    }
  });
});

server.listen(8081, () => {
  console.log('H5 server running at http://localhost:8081');
});
