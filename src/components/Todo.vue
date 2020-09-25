<template>
    <div class = "main-window">
        <ul>            
            <Item
            v-for="elem of firstWindow"
            v-bind:key="elem"
            v-bind:elem="elem"
            />
        </ul>
        <ul>    
             <Item
            v-for="elem of secondWindow"
            v-bind:key="elem"
            v-bind:elem="elem"
            />   
        </ul>      
        
    </div>
</template>

<script>
import Item from '@/components/itemVue.vue'
export default {
    props: ['firstWindow','secondWindow'], 
    components:{
        Item
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