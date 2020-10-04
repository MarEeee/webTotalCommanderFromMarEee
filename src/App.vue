<template>
    <div id = "app">
      <h1>Тестовое задание.</h1>
      <hr>
      <Todo
        @newvalue = "newvalue"
        @selectitem = "selectitem"
        v-bind:firstWindow="firstWindow"
        v-bind:secondWindow="secondWindow"
        v-bind:directories="directories"
        v-bind:firstDir="firstDir"
        v-bind:secondDir="secondDir"
        v-bind:whichScreen="whichScreen"
        v-bind:flagForBack ="flagForBack"
        v-bind:windows ="windows"
       />
    </div>
    
</template>

<script>
import Todo from '@/components/Todo.vue'
// import Directoire from '@/components/directoriesVue.vue'


export default {
  name: 'App',  
  data(){
    return {     
      
      firstWindow:{},
      secondWindow:{},     
      directories:["C:","E:","D:"],
      firstDir:"C:",
      secondDir:"C:",
      whichScreen: true,
      flagForBack: true,       
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
    .then(json => this.firstWindow = json.table)
    // .then(json => this.firstDir = json.table[0].dir)    
    .then(json => console.log(json))     
    
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
  // .then(json => this.secondDir = json.table[0].dir) 
  .then(json => console.log(json))
  // .then(this.secondDir = this.secondWindow[0].dir)


  fetch('/drives', {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin    
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    
    })
    .then(response => response.json()) 
    .then(json => this.directories = json)
    .then(json => console.log("диски", json))       
  },
  
  components: {
    Todo    
  },
  methods:{
      newvalue(data){               
         if(data[1]){ 
           this.firstWindow = data[0]; 
         }else{
           this.secondWindow = data[0];           
         }
      }
  },  
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
