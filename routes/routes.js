const {Router} = require('express');
const router = Router();
var foo = require("../script.js");
var resultDisks = require("../script.js").resultDisks;


let pathToFile1 = './data/firstScreen.json'; // вынес пути из POST
let pathToFile2 = './data/secondScreen.json';


const path = require('path');


router.get('/', (req, res)=> {
    res.sendFile(path.resolve('./dist/index.html'));
});

router.post('/firstWindow',(req, res) =>{  // отправка первого экрана
    res.sendFile(path.resolve('./data/firstScreen.json'));
})

router.post('/secondWindow',(req, res) =>{  // отправка второго экрана    
    res.sendFile(path.resolve('./data/secondScreen.json'));
})

router.post('/redrowWindow', (req, res) =>{   // перерисовка экранов по дабл клику
        let body = "";   
        req.on("data", function (data) {
            body += data;
        });
        
        req.on("end", function(currentData) {            
            currentData = JSON.parse(body);
            if(currentData.downOrUp){
                if(currentData.sizeOrType === "<папка>"){
                    let dir = currentData.dir + "\\" + currentData.fileName; 
                    redrowWindow(dir, currentData.whichScreen, res)
                }else{
                    let dir = String(currentData.dir);
                    let newDir = "";
                    let parts = dir.split("\\");               
                    newDir = parts[0];
                    for(let i = 1; i < parts.length - 1; i++){                    
                        newDir = newDir + "\\" + parts[i];
                    }                
                    redrowWindow(newDir, currentData.whichScreen, res);
                }                   
        }
    });
});

router.post('/selectMenu', (req, res) =>{
    let body = "";   

    req.on("data", function (data) {
        body += data;
    });        
    req.on("end", function(currentData) {
        currentData = JSON.parse(body);
        redrowWindow(currentData.dir + "\\", currentData.whichScreen, res);
    });
 });

router.post('/copy', (req, res) =>{   //Обработка запроса от кнопки "копировать" 
    const fs = require("fs-extra");
    let body = "";

    req.on("data", function (data) {
        body += data;
    });
    
    req.on("end", function(currentData) {
        currentData = JSON.parse(body);        
        let from = currentData.dir + "\\" +currentData.fileName;
        
        let where =  currentData.where + "\\" +currentData.fileName;
        
        fs.copySync(from, where);
       
        redrowWindow(currentData.where, !currentData.whichScreen, res); //если клик был обработан на первом экране => изменения вносим на второй и наоборот

    });  
});

router.post('/delete', (req, res) =>{ // Обработка запроса от кнопки "удалить"
    const fs = require('fs');
    let body = "";
    req.on("data", function (data) {
        body += data;
    });
    req.on("end", function(currentData) {
        currentData = JSON.parse(body);
        if(currentData.sizeOrType === "<папка>"){
            deleteFolderRecursive(currentData.dir + "\\" + currentData.fileName);
        }else{
            fs.unlinkSync(currentData.dir + "\\" + currentData.fileName);
        }
       
        redrowWindow(currentData.dir, currentData.whichScreen, res)
    });
});

router.post('/relocate', (req, res) =>{    // Обработка запроса от кнопки "переместить"
    const fs = require("fs-extra");
    let body = "";

    req.on("data", function (data) {
        body += data;
    });
    
    req.on("end", function(currentData) {
        currentData = JSON.parse(body);        
        let from = currentData.dir + "\\" +currentData.fileName;
        
        let where =  currentData.where + "\\" +currentData.fileName;       
        
        fs.copySync(from, where);

        if(currentData.sizeOrType === "<папка>"){
            deleteFolderRecursive(currentData.dir + "\\" + currentData.fileName);
        }else{
            fs.unlinkSync(currentData.dir + "\\" + currentData.fileName);
        }
        if(currentData.whichScreen){                      
            foo(currentData.dir, pathToFile1);
            foo(currentData.where, pathToFile2); 
        }else{
            foo(currentData.where, pathToFile1);
            foo(currentData.dir, pathToFile2);
        }
        let objForRedrowBothWindows = [];
        objForRedrowBothWindows.push(fs.readFileSync(pathToFile1, 'utf8'));
        objForRedrowBothWindows.push(fs.readFileSync(pathToFile2, 'utf8'));
        res.send(JSON.stringify(objForRedrowBothWindows));
    });  
});

router.post('/goHome', (req, res) =>{ // Обработка запроса от кнопки возврата в домашний католог
    const fs = require("fs-extra");
    let body = "";

    req.on("data", function (data) {
        body += data;
    });
    
    req.on("end", function(currentData) {
        currentData = JSON.parse(body);        
        let dir = currentData.dir[0] + ":\\";
        redrowWindow(dir, currentData.whichScreen, res);
    });  
});

router.post('/drives', (req, res) => {    // запрос всех доступных разделов 
    res.send(JSON.stringify(resultDisks));
 })



deleteFolderRecursive = function(path) { // функция для удаления папок и всех файлов в них
    const fs = require('fs');
    var files = [];
    if( fs.existsSync(path) ) {       
            files = fs.readdirSync(path);
        
        files.forEach(function(file,index){
            var curPath = path + "\\" + file;
            if(fs.lstatSync(curPath).isDirectory()) { // проверка директория или файл                
                deleteFolderRecursive(curPath);
            } else { // удаление файла                 
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

redrowWindow = function(dir, whichScreen, res){  // функция для перерисовки экранов
    if(whichScreen){                              
        foo(dir, pathToFile1);    
        res.sendFile(path.resolve(pathToFile1));
    }else{                  
        foo(dir, pathToFile2);
        res.sendFile(path.resolve(pathToFile2));
    } 
}

module.exports = router;