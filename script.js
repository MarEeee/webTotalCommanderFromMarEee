const fs = require('fs');

var Foo = function(dir, pathToFile){
    let Mode = require('stat-mode'); // проверка дириктори или файл
    let temp; //вспомогательная переменная 
    let jsonFile = { 
        table: []
     };

     console.log("FOO WAS STARTED");
    
    fs.readdir(dir, function(err, items) {   // Вроде работает :)
        for (let i=0; i<items.length; i++) { //массив всех файлов текущей директории       
            try{                  
                fs.stat(dir +"\\"+ items[i], function(err, stats){
                        console.log(dir +"\\"+ items[i]);
                        try{
                            let mode = new Mode(stats); // определяем папка или файл             
                            if(mode.isDirectory()){
                            temp = "<папка>";
                            } else{
                                temp = stats.size.toString() + " байт";
                            }                
                            jsonFile.table.push({icon:i, fileName:items[i], sizeOrType: temp , dateOfChange: stats.mtime, dir: dir}); //добавляем данные                    
                            fs.writeFile(pathToFile, JSON.stringify(jsonFile), (err)=>{
                                if(err) console.log("error");
                            });
                        }
                        catch(e){
                            console.log(e);
                        }
                });
            }
            catch(e){                
                console.log(e);
                continue;
            }        
        }    
    });
}




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