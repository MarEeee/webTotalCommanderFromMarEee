<template>
    <div id = "app">
      <h1>Тестовое задание.</h1>
      <hr>
      <Todo
        v-bind:firstWindow="firstWindow"
        v-bind:secondWindow="secondWindow"
       />
    </div>
    
</template>

<script>
import Todo from '@/components/Todo.vue'


export default {
  name: 'App',
  data(){
    return {
      firstWindow:[
      // {id:1, title: 'новый текстовый документ', size: "12мб", date:"12/12/12", completed: false},
      // {id:1, title: 'новый текстовый документ', size: "12мб", date:"12/12/12", completed: false},
      // {id:1, title: 'новый текстовый документ', size: "12мб", date:"12/12/12", completed: false},
      // {id:1, title: 'новый текстовый документ', size: "12мб", date:"12/12/12", completed: false},
      // {id:1, title: 'новый текстовый документ', size: "12мб", date:"12/12/12", completed: false},
      // {id:1, title: 'новый текстовый документ', size: "12мб", date:"12/12/12", completed: false},
      // {id:1, title: 'новый текстовый документ', size: "12мб", date:"12/12/12", completed: false}
      ],
      secondWindow:[
        {id:2, title: 'музяка', size: "228мб", date:"14/88/228", completed: false},
        {id:2, title: 'музяка', size: "228мб", date:"14/88/228", completed: false},
        {id:2, title: 'музяка', size: "228мб", date:"14/88/228", completed: false},
        {id:2, title: 'музяка', size: "228мб", date:"14/88/228", completed: false},
        {id:2, title: 'музяка', size: "228мб", date:"14/88/228", completed: false},
        {id:2, title: 'музяка', size: "228мб", date:"14/88/228", completed: false},
        {id:2, title: 'музяка', size: "228мб", date:"14/88/228", completed: false},
        {id:2, title: 'музяка', size: "228мб", date:"14/88/228", completed: false}
      ]
    }
  },
  mounted(){
    fetch('https://jsonplaceholder.typicode.com/todos')
    .then(response => response.json())
    .then(json => this.firstWindow = json)
  },
  components: {
    Todo    
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

div{
  
}
</style>
