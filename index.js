const http = require('http')
const fs = require('fs')
const url = require('url')
const path = require('path');

const myServer = http.createServer((req , res)=>{
  const myUrl = url.parse(req.url , true)
  switch (myUrl.pathname) {
    case '/':
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Welcome to my Server')
      break;

    case '/home':
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end(`Welcome, Home ${myUrl.query.name}`)
      break;

    case '/profile':
      serveFile(res , 'my-website.html' , 'text/html')
      break;

    case '/image':
      serveFile(res , 'image.png' , 'image/png')
      break;

    case '/audio':
      serveFile(res , 'pushpa2-audio.mp3' , 'audio/mpeg')
      break;

    case '/video':
      serveFile(res , 'sample-video.mp4' , 'video/mp4')
      break;

    case '/pdf':
      serveFile(res , 'Holiday_List_2025.pdf' , 'application/pdf')
      break;

    default:
      res.statusCode = 404
      res.setHeader('Content-Type' , 'text/plain')
      res.end('404 error not found')
      break;
  }
})

function serveFile(res, fileName, contentType) {
  const filePath = path.join(__dirname, fileName);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/plain');
      res.end('500 Internal Server Error');
    } else {
      res.statusCode = 200;
      res.setHeader('Content-Type', contentType);
      res.end(data);
    }
  });
}

const PORT = 3000
myServer.listen(PORT , () => {
  console.log(`server started at PORT ${PORT} ...`)
})