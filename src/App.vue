<template>
    <div id = "app">
      <h1>Тестовое задание.</h1>
      <hr>
      <Todo
        @newvalue = "newvalue"
        v-bind:firstWindow="firstWindow"
        v-bind:secondWindow="secondWindow"
        v-bind:directories="directories"
        v-bind:whichScreen="whichScreen"
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
      firstWindow:[],
      secondWindow:[],
      directories:["C:","E:","D:"],
      firstDir:"C:",
      secondDir:"C:",
      whichScreen: true      
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
    .then(json => this.firstWindow = json)
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
  .then(json => this.secondWindow = json) 
  .then(json => console.log(json))     
  },
  
  components: {
    Todo    
  },
  methods:{
      newvalue(data){
        console.log("РИСУУУУУУУУУЙ");
         if(data.whichScreen){
           this.firstWindow = data;
          //  this.firstWindow = Object.assign({}, this.firstWindow, data);
          //  secondWindow = this.secondWindow;
         }else{
           this.secondWindow = data;
          //  this.secondWindow = Object.assign({}, this.secondWindow, data);
          //  firstWindow = this.firstWindow;
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
