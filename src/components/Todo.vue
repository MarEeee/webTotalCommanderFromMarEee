<template>
    <main class = "main">
        <div class = "main-window"> 
            <div class = "window">
                <div class = "window__header">
                    <Directoire
                        class = "all-disks"
                        v-bind:directories="directories"
                        v-bind:whichScreen="whichScreen"

                        @newvalue="newvalue"
                    />
                    <span class = "current-way" >{{firstWindow[0] && firstWindow[0].dir}}</span>
                    <button @click="backToHomeDir(firstWindow[0].dir, whichScreen)">\</button>
                </div>   
                
                 
                <BackRowVue
                v-if="!(firstWindow[0] && firstWindow[0].dir.length < 4)"
                
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

                :active="activeElem === elem"
                @activate="activeElem = elem"
                />                
            </div>
            <div class = "window"> 
                <div class = "window__header">
                    <Directoire
                        v-bind:directories="directories"                
                        v-bind:whichScreen="!whichScreen"

                        @newvalue="newvalue"                
                    /> 
                    
                    <span class = "current-way">{{secondWindow[0] && secondWindow[0].dir}}</span>
                    <button @click="backToHomeDir(secondWindow[0].dir, !whichScreen)">\</button>
                 </div>
                
                <BackRowVue
                    v-if="!(secondWindow[0] && secondWindow[0].dir.length < 4)"               
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

                
                :active="activeElem === elem"
                @activate="activeElem = elem"
                /> 
            </div>
        </div>
       

        <div class = "control-button">     
                <button class = "btn" @click="relocate(currentElem, firstWindow, secondWindow)" :disabled = "isButtonDisabled">Перенести</button>
                <button class = "btn" @click="copy(currentElem, firstWindow, secondWindow)" :disabled = "isButtonDisabled">Скопировать</button>
                <button class = "btn" @click="remove(currentElem)" :disabled = "isButtonDisabled">Удалить</button>
        </div>
    </main>
</template>

<script>
import Item from '@/components/itemVue.vue'
import Directoire from '@/components/DirectoriesVue.vue'
import BackRowVue from '@/components/BackRowVue.vue'


export default {
    props: ['firstWindow','secondWindow', 'directories','whichScreen'], 
    components:{
        Item,        
        Directoire,
        BackRowVue
    },
    data(){
        return{
            currentElem:{},
            activeElem: null,      
        }
    },
    computed: {
        isButtonDisabled(){            
            return this.firstWindow[0] && this.firstWindow[0].dir === this.secondWindow[0] && this.secondWindow[0].dir
        },        
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
                    .then(json =>this.$emit("forbothwindows", [JSON.parse(json[0]), JSON.parse(json[1])])) // обновляем сразу два окна
        },
        remove(currentElem){            
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
        },
        backToHomeDir(dir, whichScreen){
            let sendInfo = {
                dir: dir,
                whichScreen: whichScreen
            };
            console.log("веб скрин", dir);
            console.log("веб скрин", whichScreen);
            fetch('/goHome',{
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'                 
                    },
                    body: JSON.stringify(sendInfo)                
                    })
                    .then(response => response.json()) 
                    .then(json =>this.$emit("newvalue", [json.table, whichScreen]))  
        }
        
        
    },
}
</script>

<style scoped>

.main{
    margin: auto;
    width: 1280px;
}

.main-window{
    width: 100%;
    margin: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;    
    
}
.window__header{
    display: flex;
    flex-direction: row;
    background-color:#679FD2;
    color: white;
    padding: 10px 5px 10px 5px;
   
    justify-content: space-between;
}

.current-way{
    font-weight: 600;
}



.window{  
    height: 540px;
    width: 100%; 
    margin-right: 10px;    
    overflow-y: auto;
    overflow-x: hidden;
    border: 1px solid black;
}

.bhome-buttons{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.btn{
    margin-top: 10px;
    margin-left: 10px;
    background-color: #679FD2;
    color: white;
    border: none;    
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 12px;
}

</style>