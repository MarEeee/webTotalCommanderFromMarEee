const fs = require('fs');
let obj = {
    icon:0,
    fileName: "ХУЕТА",
    sizeOrType:"<папка>",
    dateOfChange:"2020-05-11T07:41:14.049Z",
    dir:"C:\\"
 };

var Foo =function(dir, pathToFile){
    let Mode = require('stat-mode'); // проверка дириктори или файл
    let temp; //вспомогательная переменная 
    let jsonFile = { 
        table: []
     };
     


     console.log("FOO WAS STARTED");
    
     let items = fs.readdirSync(dir);
     for (let i=0; i<items.length; i++) { //массив всех файлов текущей директории       
        try{                  
           let stat =  fs.statSync(dir +"\\"+ items[i]);
           try{
            let mode = new Mode(stat); // определяем папка или файл             
            if(mode.isDirectory()){
            temp = "<папка>";
            } else{
                temp = stat.size.toString() + " байт";
            }                
            jsonFile.table.push({icon:i, fileName:items[i], sizeOrType: temp , dateOfChange: stat.mtime, dir: dir}); //добавляем данные                    
             fs.writeFileSync(pathToFile, JSON.stringify(jsonFile));
            
        }
        catch(e){
            console.log(e);
        }
        }
        catch(e){                
            console.log(e);
            continue;
        }        
    }    
    console.log(JSON.stringify(jsonFile.table));
    return jsonFile.table;
}

// var spawn = require("child_process").spawn // получаем все доступные диски

// ListDrives = function (){
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
//             fs.stat(dir +"\\"+ items[i], function(err, stats){
//                     console.log(dir +"\\"+ items[i]);
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

module.exports = Foo;
// module.exports = ListDrives;
// module.exports.obj = obj;