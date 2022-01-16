// importing the express library module to node.js
// we're going to use express to send HTML documents (MVC => C)
// uhhh... we'll do it later though, no frameworks >:) 
// const express = require('express');
// const app = new express(); 

const HTTP = require('http');
const fs = require('fs');

const myFiles = {
    html: {
        link: "src/index.html",
        data: ''
    },
    css: {
        link: "src/style.css",
        data: ''
    }
}

function runServer() { 
    
    // reading files
    fs.readFile(myFiles.html.link, (err, doc) => {
        if (err) throw err;
        else myFiles.html.data = doc; 
    });

    fs.readFile(myFiles.css.link, (err, doc) => {
        if(err) throw err;
        else myFiles.css.data = doc; 
    });

    // getting a web server to run
    let port = 3000;
    const server = HTTP.createServer((req, res) => {
         if (req.url == '/') {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(myFiles.html.data);
        }
        else if(req.url == '/' + myFiles.css.link) {
            res.writeHead(200, { "Content-Type": "text/css" });
            res.write(myFiles.css.data)
        }
        res.end();
    });

    // // create an event that responds to connections (listening)
    server.on('listening', () => console.log(`Listening to ${port}...`));

    // // listen to port on localhost 
    // // this is an event emitter 
    server.listen(port, 'localhost', () => console.log("Going to listen."));
}

runServer(); 