<template>
    <div class = "row__elements">
       <div class = "row__element">
           <div class = "file-info"> </div>
           <div class = "file-info title"> {{elem.title}} </div>
           <div class = "file-info size"> {{elem.size}} </div>
           <div class = "file-info date"> {{elem.date}} </div>
        </div>      
        
    </div>
</template>


<script>
export default {
    props:{
        elem:{
            type:Object,
            required: true
        }
    }
}
</script>


<style scoped>



.row__element{

    width: 632px;
    margin: auto;
    list-style-type: none;
    display: flex;
    flex-direction: row;
    justify-content: space-between;   
}
.file-info{
    margin-left: 15px;
}

.title{
    width: 300px;
}

.size{
    width: 132px;
}

.date{
    width: 200px;
}

.row__elements{
    margin: 0;
    border: 1px solid black;    
}

</style>


