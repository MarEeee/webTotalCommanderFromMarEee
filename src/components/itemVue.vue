<template>
    <div class = "row__elements">
       <div @click="event =>clickOnRow(elem, whichScreen)" class = "row__element">
           <div class = "file-info"> </div>
           <div class = "file-info title"> {{elem.fileName}} </div>
           <div class = "file-info size"> {{elem.sizeOrType}} </div>
           <div class = "file-info date"> {{elem.dateOfChange}} </div>
           <div class = "file-info date"> {{whichScreen}} </div>
           <div class = "file-info date"> {{elem.dir}} </div>                  
        </div>   
    </div>
</template>


<script>
export default {
    props:{
        elem:{
            type:Object,
            default: () => ({}),
            required: true,             
        },
        whichScreen:{
            type:Boolean,
            default: false,
        },
        // firstWindow:{
        //     type:Object,
        //     default: () => ({}),
        // },
        // secondWindow:{
        //     type:Object,
        //     default: () => ({}),
        // },
    },
    
    data()
        { 
            return{
                delay: 500,
                clicks: 0,
                timer: null,
                helper:[],                
            } 
        },
    methods:{
        clickOnRow: function(elem, whichScreen){
          this.clicks++
          
          if(this.clicks === 1) {
            var self = this
            this.timer = setTimeout(function() {            
            console.log("одинарный");                 
              self.clicks = 0
            }, this.delay);
          } else{
             clearTimeout(this.timer);
             console.log("двойной");
             
             elem['whichScreen']  = whichScreen;    
             console.log(elem);
                  
             fetch('/currentDir1',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',                    
                },
                body: JSON.stringify(elem)                
                })
                .then(response => response.json())    
                .then(json => this.helper = json) 
                console.log("helper");
                 console.log(this.helper);
                 this.$emit("newvalue",{
                     data: this.helper
                 })

            //  if(whichScreen){
            //      this.firstWindow = this.helper;  
            //      console.log(this.helper);
            //      console.log(this.firstWindow);  
            //      console.log(firstWindow);                
                 
            //  }else{
            //      secondWindow = this.helper;
            //      console.log(this.helper);  
            //  }            
             
             this.clicks = 0;                          
          }        	
        }
    }, 
}
</script>


<style scoped>
.row__element{

    width: 632px;
    margin: auto;
    list-style-type: none;
    display: flex;
    flex-direction: row;
    justify-content: space-between;   
}
.file-info{
    margin-left: 15px;
}

.title{
    width: 300px;
}

.size{
    width: 132px;
}

.date{
    width: 200px;
}

.row__elements{
    margin: 0;
    border: 1px solid black;    
}

</style>


