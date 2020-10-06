<template>
    <div class = "row__elements" v-if="!(elem.fileName === '')">
       <div @click="clickOnRow(elem, whichScreen)" class = "row__element" :class="{ active }">           
           <img class = "file-info icon" :src = "elem.icon"/>           
           <div class = "file-info title"> {{elem.fileName}} </div>
           <div class = "file-info size"> {{elem.sizeOrType}} </div>
           <div class = "file-info date"> {{elem.dateOfChange}} </div>                          
        </div>
          
    </div>
</template>


<script>
export default {
    props:{
        elem:{
            type:Object,
            default: () => ({}),
                        
        },
        whichScreen:{
            type:Boolean,
        },
        active: Boolean,
    },
    
    data()
        { 
            return{
                delay: 500,
                clicks: 0,
                timer: null,
                activeClass:"",
                object: {}                            
            } 
        },
    methods:{
       clickOnRow: function(elem, whichScreen){
          this.clicks++   
          if(this.clicks === 1) {
            var self = this
            this.timer = setTimeout(function() {   
              self.clicks = 0
            }, this.delay);

            elem["whichScreen"] = whichScreen;

            this.$emit('activate');
            this.$emit("selectelem", elem)
          } else{
             clearTimeout(this.timer);             
             elem['whichScreen']  = whichScreen;   
             elem['downOrUp'] = true;
             this.clicks = 0;
             if(elem.sizeOrType === "<папка>")   {            
                fetch('/redrowWindow',{
                        method: 'POST',
                        mode: 'cors',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'                 
                        },
                        body: JSON.stringify(elem)                
                    })                    
                    .then(response => response.json()) 
                    .then(json =>this.$emit("newvalue", [json.table, whichScreen])) 
             }  
          }        	
        },
        makeActive:function(elem){
            this.activeClass = elem;
        },
    }, 
}
</script>


<style scoped>
.row__element{

    width: 630px;
    height: 25px;    
    list-style-type: none;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 15px auto auto auto;
         
}
.file-info{
    overflow-x:hidden;
    overflow-y:hidden;
    margin:auto auto auto 12px;
}

.title{
    width: 300px;
    height: 20px;
    
}

.size{
    width: 132px;
}

.date{
    width: 200px;
}
.active{
    border: 1px solid blue;
    background-color: #679FD2;
    
    
}
.icon{
    width: 20px;
    height: 20px;
}

</style>


