const express = require('express');

const PORT = process.env.PORT || 3000;

const app = express();

const todoRoutes = require('./routes/routes');
let foo = require("./script.js");

let startDir = "C:\\";

pathToFirstFile = 'data/firstScreen.json';
pathToSecondFile = 'data/secondScreen.json';

foo(startDir,  pathToFirstFile);
foo(startDir,  pathToSecondFile);



app.use(express.static(__dirname + '/dist'));
app.use(todoRoutes);

function start (){
    try {
        app.listen(PORT, () =>{
            console.log("Server has been statred...")
        });
    }
    catch(e){
        console.log(e);
    }
}

start();
