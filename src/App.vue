<template>
    <div id = "app">   
      <Todo
        @newvalue = "newvalue"
        @forbothwindows = "forbothwindows"
        @selectitem = "selectitem"
        v-bind:firstWindow="firstWindow"
        v-bind:secondWindow="secondWindow"
        v-bind:directories="directories"       
        v-bind:whichScreen="whichScreen"
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
      directories:[],
      whichScreen: true,            
    }
  },
  mounted(){

    fetch('/firstWindow', {
    method: 'POST', 
    mode: 'cors',    
    headers: {
       'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
   
  })
    .then(response => response.json())    
    .then(json => this.firstWindow = json.table)
    
    
    fetch('/secondWindow', {
        method: 'POST', 
        mode: 'cors',    
        headers: {
          'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
  })
  .then(response => response.json()) 
  .then(json => this.secondWindow = json.table)
  

    fetch('/drives', {
      method: 'POST', 
      mode: 'cors',  
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      
      })
      .then(response => response.json()) 
      .then(json => this.directories = json)    
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
      },
      forbothwindows(data){
        console.log(typeof(data));        
        console.log(data);
        this.firstWindow = data[0].table;
        this.secondWindow = data[1].table; 
      }
  },  
}
</script>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
