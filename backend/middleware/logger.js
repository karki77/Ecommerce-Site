const colors = require ("colors");
const fs = require ("fs");
const path = require ("path");

function logger (req, res, next){
    let reqColors = {
        GET: "bgGreeen",
        POST: "yellow",
        PUT: "blue",
        DELETE: "red",
    };
    let start = Date.now();
    res.on("finish", () => {
       let end = Date.now();
       let today = new Date();
       let logMessage = ` ${today.getFullYear()} / ${today.getMonth() + 1}
       / ${today.getDate()} - ${req.method} ${req.originalUrl} ${req.ip} ${res.statusCode} ${end - start}ms`;
       console.log(logMessage[reqColors[req.method]]);
       fs.appendFile(
        path.join(__dirname,"../app.log"),
        logMessage + "\n",
        (err) => {
            if(err)console.log(err.message);
        
        }
       );
    });
    next();
}

module.exports = logger;