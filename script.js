const fs = require('fs');
const nodeDiskInfo = require("node-disk-info");

var Foo =function(dir, pathToFile){
    let Mode = require('stat-mode'); // проверка дириктори или файл
    let temp; //вспомогательная переменная
    let jsonFile = { 
        table: []
     };
     let path = require('path');
     try{
        let items = fs.readdirSync(dir);
        if(items.length === 0){
            jsonFile.table.push({icon: "", fileName: "", sizeOrType: "" , dateOfChange: "", dir: dir}); //если директория пуста                   
            fs.writeFileSync(pathToFile, JSON.stringify(jsonFile));
        }
        for (let i=0; i<items.length; i++) { //массив всех файлов текущей директории
            try{                  
            let stat =  fs.statSync(dir +"\\"+ items[i]);
            
            // if(items[i].length>25){
            //     console.log('re');
            //     items[i] = items[i].splice(0,25);
            // }
                try{            
                    let mode = new Mode(stat); // определяем папка или файл
                    let icon = "https://e7.pngegg.com/pngimages/713/942/png-clipart-computer-icons-document-file-format-file-miscellaneous-angle.png";         
                    if(mode.isDirectory()){
                        temp = "<папка>";
                        icon = "https://s1.iconbird.com/ico/0612/vistabasesoftwareicons/w256h2561339252686FolderOpenedYellow.png";
                    } else{
                        temp = formatSizeUnits(stat.size);
                        // temp = stat.size.toString() + " байт";
                    }
                    
                    if(path.extname(items[i]) === '.png' || path.extname(items[i]) === '.jpg'){
                        
                        icon = "https://pngicon.ru/file/uploads/gory.png";
                    }
                    if( path.extname(items[i]) === '.txt' || path.extname(items[i]) === '.docx' || path.extname(items[i]) === '.exel'){
                        icon = "https://upload.wikimedia.org/wikipedia/ru/1/13/Windows_Notepad_Icon.png";
                    }            
                    
                    let qu = String(stat.mtime).split('T').join(',').split(" ");            
                    let time = qu[2] + "." + qu[1]+ "." +qu[3] + " " + qu[4];

                    jsonFile.table.push({icon:icon, fileName:items[i], sizeOrType: temp , dateOfChange: time, dir: dir}); //добавляем данные                    
                    fs.writeFileSync(pathToFile, JSON.stringify(jsonFile));
                    
                    }
                catch(e){

                }
            }
            catch(e){  
                continue;
            }        
        }   
    }
    catch{
    } 
    return jsonFile.table;
}
let resultDisks = [];
function takeDisks() {
    try {
        const disks = nodeDiskInfo.getDiskInfoSync();
        for (const disk of disks) {
            if(disk.blocks!=0){ // доступен ли диск?
                resultDisks.push(disk.mounted);
            }        
        } 
    }catch (e){
            console.error(e);
    }
}

function formatSizeUnits(bytes){
    if      (bytes>=1073741824) {bytes=(bytes/1073741824).toFixed(2)+' ГБ';}
    else if (bytes>=1048576)    {bytes=(bytes/1048576).toFixed(2)+' МБ';}
    else if (bytes>=1024)       {bytes=(bytes/1024).toFixed(2)+' КБ';}
    else if (bytes>=0)           {bytes=bytes+' Б';}
    return bytes;
}




takeDisks();

module.exports = Foo;
module.exports.resultDisks= resultDisks;
