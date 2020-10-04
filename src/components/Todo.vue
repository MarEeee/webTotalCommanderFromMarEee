<template>
    <div >
        <div class = "main-window"> 
            <ul >    
                <Directoire
                v-bind:directories="directories"
                />
                <span>{{firstWindow[0].dir}}</span> 
                <BackRowVue
                v-if="!(firstWindow[0].dir.length < 4)"
                
                v-bind:whichScreen="whichScreen"

                v-bind:firstWindow="firstWindow"  
                v-bind:secondWindow="secondWindow"

                @newvalue="newvalue"
                />                        
                <Item           
                v-for="elem of firstWindow"
                v-bind:key="elem"
                v-bind:elem="elem"
                v-bind:whichScreen="whichScreen"
                v-bind:firstWindow="firstWindow"
                v-bind:secondWindow="secondWindow"
                @newvalue="newvalue"
                @selectelem="selectelem"
                />
            </ul>
            <ul > 
                <Directoire
                v-bind:directories="directories"
                /> 
                
                <span>{{secondWindow[0].dir}}</span>
                <BackRowVue
                    v-if="!(secondWindow[0].dir.length < 4)"               
                    v-bind:whichScreen="!whichScreen"

                    v-bind:firstWindow="firstWindow"  
                    v-bind:secondWindow="secondWindow"

                    @newvalue="newvalue"
                />                       
                <Item
                v-for="elem of secondWindow"
                v-bind:key="elem"
                v-bind:elem="elem"
                v-bind:whichScreen="!whichScreen"
                v-bind:firstWindow="firstWindow"
                v-bind:secondWindow="secondWindow"
                @newvalue="newvalue"
                @selectelem="selectelem"
                />   
            </ul>
        </div>
        <div class = "control-button">     
                <button @click="relocate(currentElem, firstWindow, secondWindow)">Перенести</button>
                <button @click="copy(currentElem, firstWindow, secondWindow)">Скопировать</button>
                <button @click="remove(currentElem)">Удалить</button>
        </div>
    </div>
</template>

<script>
import Item from '@/components/itemVue.vue'
import Directoire from '@/components/DirectoriesVue.vue'
import BackRowVue from '@/components/BackRowVue.vue'
// import { json } from 'express'

export default {
    props: ['firstWindow','secondWindow', 'directories', 'firstDir', 'secondDir', 'whichScreen', 'flagForBack','windows'], 
    components:{
        Item,        
        Directoire,
        BackRowVue
    },
    data(){
        return{
            flagForButton:false,
            currentElem:{}
        }
    },
    methods:{
        newvalue(data){                                  
            this.$emit('newvalue', data);
        },
        selectelem(elem){            
            this.currentElem = elem;            
        },
        copy(currentElem, firstWindow, secondWindow){
            console.log("dsadsad");
            console.log(this.currentElem);
            if(this.currentElem.whichScreen){
                currentElem['where'] = secondWindow[0].dir;
            }else{
                currentElem['where'] = firstWindow[0].dir;
            }
            fetch('/copy',{
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'                 
                    },
                    body: JSON.stringify(currentElem)                
                    })
                    .then(response => response.json()) 
                    .then(json =>this.$emit("newvalue", [json.table, !this.currentElem.whichScreen]))       
        },
        relocate(currentElem, firstWindow, secondWindow){
            if(this.currentElem.whichScreen){
                currentElem['where'] = secondWindow[0].dir;
            }else{
                currentElem['where'] = firstWindow[0].dir;
            }
            fetch('/relocate',{
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'                 
                    },
                    body: JSON.stringify(currentElem)                
                    })
                    .then(response => response.json())
                    .then(json => console.log("firstWindow",json[0].table))
                    .then(json => console.log("secondWindow",json[1].table))  
                    // .then(json =>this.$emit("newvalue", [json.table, this.currentElem.whichScreen])) 
        },
        remove(currentElem){
            console.log(this.currentElem);
            fetch('/delete',{
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'                 
                    },
                    body: JSON.stringify(currentElem)                
                    })
                    .then(response => response.json()) 
                    .then(json =>this.$emit("newvalue", [json.table, this.currentElem.whichScreen]))  
        }
        
        
    },
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