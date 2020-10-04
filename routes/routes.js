const {Router} = require('express');
const router = Router();
var foo = require("../script.js");
// var listDrives = require("../script.js");
let obj = require("../script.js");

// console.log(obj.obj);
// app.configure(function(){
//     app.use(express.bodyParser());
//   });  

let pathToFile1 = './data/firstScreen.json'; // вынес пути из POST
let pathToFile2 = './data/secondScreen.json';


const path = require('path');


router.get('/', (req, res)=> {
    res.sendFile(path.resolve('./dist/index.html'));
});

router.post('/1',(req, res) =>{  // отправка первого экрана
    console.log("POST");
    res.sendFile(path.resolve('./data/firstScreen.json'));
})

router.post('/2',(req, res) =>{  // отправка второго экрана
    console.log("POST");
    res.sendFile(path.resolve('./data/secondScreen.json'));
})

router.post('/currentDir1', (req, res) =>{  
        console.log("POST for update data");
       const fs = require('fs');
        let body = "";   
       let pathToFile = "";
                
        
        req.on("data", function (data) {
            body += data;
        });
        
        req.on("end", function(currentData) {
            console.log("bodt", JSON.parse(body));
            currentData = JSON.parse(body);
            if(currentData.downOrUp){
                    if(currentData.sizeOrType === "<папка>"){
                        let dir = currentData.dir + "\\" + currentData.fileName;                   
                        console.log(dir);
                        redrowWindow(dir, currentData.whichScreen, res)
                        
                        // if(currentData.whichScreen){         // Дублируется код                      
                        //     foo(dir, pathToFile1);    
                        //     res.sendFile(path.resolve(pathToFile1));
                        // }else{                            
                        //     foo(dir, pathToFile2);
                        //     res.sendFile(path.resolve(pathToFile2));
                        // } 
                
            }else{
                console.log("попал. Путь такой", currentData.dir); // пока хуйня, не работает.
                
                let dir = String(currentData.dir);
                let newDir = "";
                let parts = dir.split("\\");
                console.log(parts);
                newDir = parts[0];
                for(let i = 1; i < parts.length - 1; i++){
                    console.log(i);
                    newDir = newDir + "\\" + parts[i];
                }
                console.log("newDIR", newDir);
                redrowWindow(newDir, currentData.whichScreen, res)

                // if(currentData.whichScreen){             // Дублируется код    
                //     foo(newDir, pathToFile1);    
                //     res.sendFile(path.resolve(pathToFile1));
                // }else{                            
                //     foo(newDir, pathToFile2);
                //     res.sendFile(path.resolve(pathToFile2));
                // }  
            }                   
        }
    });
})

router.post('/copy', (req, res) =>{
    
    const fs = require("fs-extra");
    let body = "";

    req.on("data", function (data) {
        body += data;
    });
    
    req.on("end", function(currentData) {
        currentData = JSON.parse(body);
        console.log('дата',currentData);
        let from = currentData.dir + "\\" +currentData.fileName;
        console.log("откуда", currentData.dir);
        let where =  currentData.where + "\\" +currentData.fileName;
        console.log("куда", where);
        console.log("что", from);
        
        fs.copySync(from, where);
        // ncp(from, where);
        console.log(!currentData.whichScreen);
        redrowWindow(currentData.where, !currentData.whichScreen, res); //если клик был обработан на первом экране => изменения вносим на второй и наоборот

    });  
});
// router.post('/drives', (req, res) => {
//     listDrives().then(list => res.send(JSON.stringify(list)));
//  })

router.post('/delete', (req, res) =>{
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

router.post('/relocate', (req, res) =>{
    console.log("SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS");
    const fs = require("fs-extra");
    let body = "";

    req.on("data", function (data) {
        body += data;
    });
    
    req.on("end", function(currentData) {
        currentData = JSON.parse(body);
        console.log('дата',currentData);
        let from = currentData.dir + "\\" +currentData.fileName;
        console.log("откуда", currentData.dir);
        let where =  currentData.where + "\\" +currentData.fileName;
        console.log("куда", where);
        console.log("что", from);
        
        fs.copySync(from, where);

        if(currentData.sizeOrType === "<папка>"){
            deleteFolderRecursive(currentData.dir + "\\" + currentData.fileName);
        }else{
            fs.unlinkSync(currentData.dir + "\\" + currentData.fileName);
        }                      
        foo(currentData.dir, pathToFile1);
        foo(currentData.where, pathToFile2); 
        
        let objForRedrowBothWindows = [];
        objForRedrowBothWindows.push(fs.readFileSync(pathToFile1, 'utf8'));
        objForRedrowBothWindows.push(fs.readFileSync(pathToFile2, 'utf8'));
        res.json(objForRedrowBothWindows);
        // res.sendFile(path.resolve(pathToFile1));
        // res.sendFile(path.resolve(pathToFile2));
        
        
    });  
});



deleteFolderRecursive = function(path) {
    const fs = require('fs');
    var files = [];
    if( fs.existsSync(path) ) {       
            files = fs.readdirSync(path);
        
        files.forEach(function(file,index){
            var curPath = path + "\\" + file;
            if(fs.lstatSync(curPath).isDirectory()) { // проверка директория или файл
                console.log("хули?");
                deleteFolderRecursive(curPath);
            } else { // удаление файла 
                console.log(curPath);
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

redrowWindow = function(dir, whichScreen, res){
    if(whichScreen){                              
        foo(dir, pathToFile1);    
        res.sendFile(path.resolve(pathToFile1));
    }else{     
        console.log("dsad") ;                      
        foo(dir, pathToFile2);
        res.sendFile(path.resolve(pathToFile2));
    } 
}

// var fs = require('fs');
// function move(oldPath, newPath, callback) {

//     fs.rename(oldPath, newPath, function (err) {
//         if (err) {
//             if (err.code === 'EXDEV') {
//                 copy();
//             } else {
//                 callback(err);
//             }
//             return;
//         }
//         callback();
//     });

//     function copy() {
//         var readStream = fs.createReadStream(oldPath);
//         var writeStream = fs.createWriteStream(newPath);

//         readStream.on('error', callback);
//         writeStream.on('error', callback);

//         readStream.on('close', function () {
//             fs.unlink(oldPath, callback);
//         });

//         readStream.pipe(writeStream);
//     }
// }
// router.post('/currentDir1',(req, res) =>{  
//     console.log("POST");
    
//     let body = "";   
//     let pathToFile = "";
//     req.on("data", function (data) {
//         body += data;
//     });
//     return new Promise((resolve, reject) => {
//     req.on("end", function(currentData) {
//         console.log(JSON.parse(body));
//         currentData = JSON.parse(body);
        

//         if(currentData.sizeOrType === "<папка>"){
//             let dir = currentData.dir + currentData.fileName;
//             // dir = "C:\\totalcmd";
//             console.log(dir);                
//             if(currentData.whichScreen){
//                 foo(dir, './data/firstScreen.json');
//                 pathToFile = './data/firstScreen.json';
//                 // res.sendFile(path.resolve('./data/firstScreen.json'));
//             }else{
//                 console.log('aaaa');
//                 Foo(dir, './data/secondScreen.json');
//                 pathToFile = './data/firstScreen.json';
//                 // res.sendFile(path.resolve('./data/secondScreen.json'));                
//             }
//             resolve(pathToFile);        
//         }
    
//         res.json({ message: 'goodbye'})   
          
//     });
// })        
// .then(data => res.sendFile(path.resolve(data)));  
// })









// router.post('/currentDir1',(req, req) =>{  
//     console.log("POST");
    
//     let body = "";   
//     let pathToFile = "";
//     req.on("data", function (data) {
//         body += data;
//     });
//     return new Promise((req, req) => {
//     req.on("end", function(currentData) {
//         console.log(JSON.parse(body));
//         currentData = JSON.parse(body);
        

//         if(currentData.sizeOrType === "<папка>"){
//             let dir = currentData.dir + currentData.fileName;
//             // dir = "C:\\totalcmd";
//             console.log(dir);                
//             if(currentData.whichScreen){
//                 foo(dir, './data/firstScreen.json');
//                 pathToFile = './data/firstScreen.json';
//                 res.sendFile(path.resolve('./data/firstScreen.json'));
//             }else{
//                 console.log('aaaa');
//                 Foo(dir, './data/secondScreen.json');
//                 pathToFile = './data/firstScreen.json';
//                 res.sendFile(path.resolve('./data/secondScreen.json'));
                
//             }        
//         }
    
//         res.json({ message: 'goodbye'})   
          
//     });
// })        
   
// })


// router.post('/currentDir1', (req, res) =>{  
//     console.log("POST");
    
//     let body = "";   
//     let pathToFile = "";
//     req.on("data", function (data) {
//         body += data;
//     });
    
//     req.on("end", function(currentData) {
//         console.log(JSON.parse(body));
//         currentData = JSON.parse(body);
        

//         if(currentData.sizeOrType === "<папка>"){
//             let dir = currentData.dir + currentData.fileName;
//             // dir = "C:\\totalcmd";
//             console.log(dir);                
//             if(currentData.whichScreen){
//                 foo(dir, './data/firstScreen.json');
//                 pathToFile = './data/firstScreen.json';
//                 res.sendFile(path.resolve('./data/firstScreen.json'));
//             }else{
//                 console.log('aaaa');
//                 Foo(dir, './data/secondScreen.json');
//                 pathToFile = './data/firstScreen.json';
//                 res.sendFile(path.resolve('./data/secondScreen.json'));
                
//             }        
//         }
    
//         // res.json({ message: 'goodbye'})   
//         res.json(path.resolve(pathToFile));     
//     });
       
//     res.sendFile(path.resolve(pathToFile));
// })


module.exports = router;