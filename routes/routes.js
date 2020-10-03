const {Router} = require('express');
const router = Router();
var foo = require("../script.js");
let obj = require("../script.js");
// console.log(obj.obj);
// app.configure(function(){
//     app.use(express.bodyParser());
//   });  




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
        console.log("POST");
        const fs = require('fs');
        let body = "";   
        let pathToFile = "";
        console.log(req.body);        
        
        req.on("data", function (data) {
            body += data;
        });
        
        req.on("end", function(currentData) {
            console.log(JSON.parse(body));
            currentData = JSON.parse(body);


        console.log("еще тут");
        
        
                if(currentData.sizeOrType === "<папка>"){
                    let dir = currentData.dir + currentData.fileName;
                    // dir = "C:\\totalcmd";
                    console.log(dir);                
                    if(currentData.whichScreen){
                        console.log(currentData.whichScreen);                    
                        // let result = foo(dir, './data/firstScreen.json');
                        foo(dir, './data/firstScreen.json');
                        pathToFile = './data/firstScreen.json';
                        
                        var json1 = JSON.parse(fs.readFileSync('./data/firstScreen.json', 'utf8'));
                        
                        // json1 = fs.readFile('/path/to/file.json', 'utf8', function (err, data) {
                        //     if (err) throw err; // we'll not consider error handling for now
                        //     var obj = JSON.parse(data);
                        //     return obj;
                        // });
                        res.sendFile(path.resolve('./data/firstScreen.json'));
                          
                        
                           
                                                
                    
                    }else{
                        console.log('aaaa');
                        foo(dir, './data/secondScreen.json');
                        pathToFile = './data/firstScreen.json';
                        res.sendFile(path.resolve('./data/secondScreen.json'));
                        
                    } 
                    
                
                   
            }
            console.log("я тут");
            
            
            // res.json(takeValue);    
        //     res.json({ message: 'goodbye'})   
        // res.json(path.resolve(pathToFile));      
        });
           
        // res.sendFile(path.resolve(pathToFile));
    })




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