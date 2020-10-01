<template>
    <div >
        <select class = "select" v-on:change="event =>takeWay(event)">
            <!-- <option>{{directories}}</option>             -->
             <option  v-for="directory in directories" :key="directory" :value="directory" >{{directory}}</option>
        </select>
    </div>
</template>


<script>
export default {
    props:['directories'],
    methods:{
         takeWay: function(event) {
            console.log(event.target.value);
        }
    }
}
</script>

<style scoped>
.select{
    margin-left: 0px;
}
</style>