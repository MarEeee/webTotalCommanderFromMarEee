<template>
    <div class = "row__element">
         <img src = "./../images/back.png" class = "back-image" @dblclick="clickOnRow(data, whichScreen, firstWindow, secondWindow)"/>      
    </div>
</template>

<script>
export default {
    props: ["whichScreen", 'firstWindow','secondWindow'],
    data()
        {   
            return{
                data:{}
            }            
         },
    methods:{
        clickOnRow: function(data, whichScreen){
            data['whichScreen']  = whichScreen;   
            data['downOrUp'] = true;
            if(whichScreen){                
                data['dir'] = this.firstWindow[0].dir;
            }else{
                data['dir'] = this.secondWindow[0].dir;
            }
            
            fetch('/redrowWindow',{
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'                 
                    },
                    body: JSON.stringify(data)                
                    }) 
                    .then(response => response.json()) 
                    .then(json =>this.$emit("newvalue", [json.table, whichScreen]))     
        },
    }

}
      
</script>

<style>
.row__element{
    width: 632px;
    text-align: left;
    height: 20px;
    margin-top: 5px;
    /* border: 1px solid black; */
}
.back-image{
    width: 20px;
    height: 20px;
    margin-left:20px;
    
}
</style>