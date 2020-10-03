<template>
    <div class = "row__element" @click="event =>clickOnRow(elem, whichScreen)">
       БЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭК
    </div>
</template>



<script>
export default {
    props: ['whichScreen'],
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

             console.log(elem);
             
             elem['whichScreen']  = whichScreen;    
            //  console.log(this.helper);
            //  this.nameOfMethod(elem);
             this.clicks = 0; 
            fetch('/currentDir1',{
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'                 
                    },
                    body: JSON.stringify(elem)                
                    })                   
                }    
        },
    }

}
      
</script>

<style>

</style>