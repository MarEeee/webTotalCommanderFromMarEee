<template>
    <div class = "main-window">
        <ul >    
            <Directoire
             v-bind:directories="directories"
            />
            <span>{{firstDir}}</span> 
            <BackRowVue
            v-if="flagForBack"
            v-bind:whichScreen="whichScreen"
            />            
            <div  class = "back-block"> BACK </div>                             
            <Item           
            v-for="elem of windows.firstWindow"
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
            <BackRowVue
                v-if="flagForBack"
                v-bind:whichScreen="!whichScreen"
             />
              <div  class = "back-block"> BACK </div>             
             <Item
            v-for="elem of secondWindow"
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
import BackRowVue from '@/components/BackRowVue.vue'

export default {
    props: ['firstWindow','secondWindow', 'directories', 'firstDir', 'secondDir', 'whichScreen', 'flagForBack','windows'], 
    components:{
        Item,        
        Directoire,
        BackRowVue
    },
    methods:{
        newvalue(data,whichScreen){                       
            this.$emit('newvalue', data, whichScreen);
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
.back-block{
    border: 1px solid red;
}
</style>