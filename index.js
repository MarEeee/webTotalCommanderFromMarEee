const express = require('express');

const PORT = process.env.PORT || 3000;

const app = express();

const todoRoutes = require('./routes/routes');
let foo = require("./script.js");

// работа с файловой системой
const fs = require('fs');
const path = "C:\\"; //взять в работу

let firstDir = "C:\\";
let secondDir = "E:\\";

pathToFirstFile = 'data/firstScreen.json';
pathToSecondFile = 'data/secondScreen.json';

let firstData = {};  // создаем заготвоку для Json файлов   


let secondData = {}; 
    


 disks = [];
foo(firstDir,  pathToFirstFile);
foo(firstDir,  pathToSecondFile);

// var Foo = function(dir, pathToFile){
//     let Mode = require('stat-mode'); // проверка дириктори или файл
//     let temp; //вспомогательная переменная 
//     let jsonFile = { 
//         table: []
//      };

//      console.log("FOO WAS STARTED");
    
//     fs.readdir(dir, function(err, items) {   // Вроде работает :)
//         for (let i=0; i<items.length; i++) { //массив всех файлов текущей директории       
//             if(items[i].indexOf("System Volume Information")!= -1 || items[i].indexOf("hiberfil")!= -1 || items[i].indexOf("pagefile")!= -1 || items[i].indexOf("MSOCache")!= -1 || items[i].indexOf("swapfile")!= -1 || items[i].indexOf("Recovery")!= -1){
//                 continue;
//             }                   
//             fs.stat(dir +  items[i], function(err, stats){
//                     if(err) throw err;
//                     let mode = new Mode(stats); // определяем папка или файл             
//                     if(mode.isDirectory()){
//                     temp = "<папка>";
//                     } else{
//                         temp = stats.size.toString() + " байт";
//                     }                
//                     jsonFile.table.push({icon:i, fileName:items[i], sizeOrType: temp , dateOfChange: stats.mtime, dir: dir}); //добавляем данные                    
//                     fs.writeFile(pathToFile, JSON.stringify(jsonFile), (err)=>{
//                         if(err) console.log("error");
//                     });
//             });        
//         }    
//     });
// }



// module.exports = Foo;



// var dataOfScreens = []; // формируем массив объектов для отправки

// dataOfScreens.push(JSON.parse(fs.readFileSync('data/firstScreen.json', 'utf8')));
// dataOfScreens.push(JSON.parse(fs.readFileSync('data/secondScreen.json', 'utf8')));

// exports.dataOfScreens = dataOfScreens;

// console.log(dataOfScreens);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// var spawn = require("child_process").spawn

// function listDrives(){
//     const list  = spawn('cmd');

//     return new Promise((resolve, reject) => {
//         list.stdout.on('data', function (data) {
//             // console.log('stdout: ' + String(data));
//             const output =  String(data)
//             const out = output.split("\r\n").map(e=>e.trim()).filter(e=>e!="")
//             if (out[0]==="Name"){
//                 resolve(out.slice(1))
//             }
//             // console.log("stdoutput:", out)
//         });

//         list.stderr.on('data', function (data) {
//             // console.log('stderr: ' + data);
//         });

//         list.on('exit', function (code) {
//             console.log('child process exited with code ' + code);
//             if (code !== 0){
//                 reject(code)
//             }
//         });

//         list.stdin.write('wmic logicaldisk get name\n');
//         list.stdin.end();
//     })
// }

// listDrives().then((data) => console.log(data))
// console.log(disks[0]);





///////////////////////////////////////////////////////////////////////////////////////////////////////////////

// let sectionsList = [];     //ебаное говно говна, пока не работает >_<
// let str;

// function get_win_drives(success_cb,error_cb){
//     var stdout = '';
//     var spawn = require('child_process').spawn,
//             list  = spawn('cmd');

//     list.stdout.on('data', function (data) {
//         stdout += data;
//     });

//     list.stderr.on('data', function (data) {
//         console.log('stderr: ' + data);
//     });

//     list.on('exit', function (code) {
//         if (code == 0) {
//             // console.log(stdout);
//             var data = stdout.split('\r\n');
//             data = data.splice(4,data.length - 7);
//             data = data.map(Function.prototype.call, String.prototype.trim);
//             return data;
//             // console.log(data);
//             // success_cb(data);
//         } else {
//             console.log('child process exited with code ' + code);
//             error_cb();
//         }
//     });
//     list.stdin.write('wmic logicaldisk get caption\n');
//     list.stdin.end();
// }

// sectionsList = get_win_drives();
// console.log(sectionsList);



//////////////////////////////////////////////////////////////////////




//  идея - вытащить дочерние пути до всех дисков С-D - E и тд

// const exec = require('child_process').exec; 
// exec('wmic logicaldisk get name', (error, stdout, stderr) => {
//   if (error) {
//     console.error(`exec error: ${error}`);
//     return;
//   }

//   str = stdout.split(" ");
// //   str = str.split("\n");
//   console.log(str);
  
//   for(let i = 0; i<stdout.length; i++){
//     if(stdout.indexOf(":")!=-1){
//        elem =  stdout.split(":");
//        console.log(elem);
//     }}
    // console.log(elem);
// });

// console.log(str);

// var path1 = require('path');
// var appDir = path1.dirname(require.main.filename);
// console.log(appDir);







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
