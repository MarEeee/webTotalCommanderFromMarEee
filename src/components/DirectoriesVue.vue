<template>
    <div >
        <select v-on:change="event =>takeWay(event, whichScreen)">            
             <option  v-for="directory in directories" :key="directory" :value="directory" >{{directory}}</option>
        </select>
    </div>
</template>


<script>
export default {
    props:['directories', 'whichScreen'],
        
    methods:{
         takeWay: function(event, whichScreen) {
            let elem = {};            
            elem['dir']  = event.target.value;  
            elem['whichScreen']  = whichScreen;  
            fetch('/selectMenu',{
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
}
</script>
