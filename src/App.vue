<template>
    <div id = "app">
      <h1>Тестовое задание.</h1>
      <hr>
      <Todo
        @newvalue = "newvalue"
        v-bind:firstWindow="firstWindow"
        v-bind:secondWindow="secondWindow"
        v-bind:directories="directories"
        v-bind:firstDir="firstDir"
        v-bind:secondDir="secondDir"
        v-bind:whichScreen="whichScreen"
        v-bind:flagForBack ="flagForBack"
        v-bind:windows ="windows"
       />

       <button @click="relocate()">Перенести</button>
       <button @click="copy()">Скопировать</button>
       <button @click="remove()">Удалить</button>
    </div>
    
</template>

<script>
import Todo from '@/components/Todo.vue'
// import Directoire from '@/components/directoriesVue.vue'


export default {
  name: 'App',  
  data(){
    return {      
      windows:{
        firstWindow:{},
        secondWindow:{}
      },
      firstWindow:[],
      secondWindow:{},
      objForChangeValue:[],
      directories:["C:","E:","D:"],
      firstDir:"C:",
      secondDir:"C:",
      whichScreen: true,
      flagForBack: true      
    }
  },
  mounted(){
    fetch('/1', {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin    
    headers: {
       'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
   
  })
    .then(response => response.json())    
    .then(json => this.windows.firstWindow =  json.table)
    .then(json => console.log(json))
   ;    
    // .then(console.log(this.firstWindow)) //почему он выводится как уебище какое-то ? 
    // .then(this.firstDir = this.firstWindow[0].dir)   
    
    fetch('/2', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin    
        headers: {
          'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
  })
  .then(response => response.json()) 
  .then(json => this.secondWindow = json.table) 
  .then(json => console.log(json))
  // .then(this.secondDir = this.secondWindow[0].dir)      
  },
  
  components: {
    Todo    
  },
  methods:{
      newvalue(data, whichScreen){        
         if(whichScreen){ 
           console.log("первое");
           console.log(data);
           console.log(this.objForChangeValue);
          //  this.$set(this.windows, 'firstWindow', Object.assign({}, this.firstWindow, data)); 
           this.windows.firstWindow =  Object.assign({}, this.windows.firstWindow, data); 
           console.log(this.firstWindow);      
          //  this.firstWindow =  this.objForChangeValue;
          
         }else{          
           this.secondWindow = Object.assign({}, this.secondWindow, data); 
           console.log("Второе");
           console.log(this.secondWindow);          
         }
      }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
