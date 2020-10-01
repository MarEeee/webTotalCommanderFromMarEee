<template>
    <div class = "main-window">
        <ul >    
            <Directoire
             v-bind:directories="directories"
            />
            <span>{{firstDir}}</span>                              
            <Item           
            v-for="elem of firstWindow.table"
            v-bind:key="elem"
            v-bind:elem="elem"
            v-bind:whichScreen="whichScreen"
            v-bind:firstWindow="firstWindow"
            v-bind:secondWindow="secondWindow"
            @newvalue="newvalue"
            />
        </ul>
        <ul @newValue="newvalue"> 
             <Directoire
              v-bind:directories="directories"
             />  
              <span>{{secondDir}}</span>            
             <Item
            v-for="elem of secondWindow.table"
            v-bind:key="elem"
            v-bind:elem="elem"
            v-bind:whichScreen="!whichScreen"
            v-bind:firstWindow="firstWindow"
            v-bind:secondWindow="secondWindow"
            />   
        </ul>      
        
    </div>
</template>

<script>
import Item from '@/components/itemVue.vue'
import Directoire from '@/components/DirectoriesVue.vue'


export default {
    props: ['firstWindow','secondWindow', 'directories', 'firstDir', 'secondDir', 'whichScreen'], 
    components:{
        Item,        
        Directoire
    },
    methods:{
        newvalue(data){
            console.log("DATAAAAAAAAAAAAAAAAAA");
            console.log(data);
            this.$emit("newvalue",{
                     data: data
                 });
        }
        
    }
}
</script>

<style scoped>
.main-window{
    width: 1280px;
    margin: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border: 1px solid black;
    
}



ul{
    list-style: none;
    margin:0;
    padding: 0
}
</style>