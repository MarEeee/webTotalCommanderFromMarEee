const {Router} = require('express');
const router = Router();
var foo = require("../script.js");


const path = require('path');
var myModule = require('../index.js');

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


router.post('/currentDir1',(req, res) =>{  
    console.log("POST");
    
    let body = "";   
    // let dir = "";
    req.on("data", function (data) {
        body += data;
    });
    req.on("end", function(currentData) {
        console.log(JSON.parse(body));
        currentData = JSON.parse(body);

        if(currentData.sizeOrType === "<папка>"){
            let dir = currentData.dir + currentData.fileName;
            // dir = "C:\\totalcmd";
            console.log(dir);                
            if(currentData.whichScreen){
                foo(dir, './data/firstScreen.json');
                res.sendFile(path.resolve('./data/secondScreen.json'));
            }else{
                console.log('aaaa');
                Foo(dir, './data/secondScreen.json');
                res.sendFile(path.resolve('./data/secondScreen.json'));
                
            }        
        }
        res.json({ message: 'goodbye'})        
    });        
    
})



module.exports = router;