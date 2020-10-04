<template>
    <div class = "row__element" @dblclick="event =>clickOnRow(data, whichScreen, firstWindow, secondWindow)">
         БЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭК
      
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
                console.log(this.firstWindow[0].dir);
                data['dir'] = this.firstWindow[0].dir;
            }else{
                data['dir'] = this.secondWindow[0].dir;
            }
            console.log(data);
                
            console.log("elem",data);
            console.log("whichScreen",whichScreen);
            fetch('/currentDir1',{
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
    border: 1px solid red;
}
</style>