<template>
  <div id="app">
    <div class="ui segment task" v-bind:class="task.completed ? 'done' : 'todo'"> 
        <div class="ui grid">
            <div class="row">
                <div class="left floated equal wide column">
                    <div class="ui checkbox">
                        <input type="checkbox" name="task" v-on:click="toggleDone($event, task.id)" :checked="task.completed">
                        <label>{{task.name}}<span class="description">{{task.description}}</span></label>
                    </div>
                <div>
                <div class="right floated equal wide column">
                    <i class="icon pencil" alt="Edit" v-on:click="editTask($event, task.id)"></i>
                    <i class="icon trash" alt="Delete" v-on:click="deleteTask($event, task.id)"></i>
                </div>
            </div>
        </div>
  </div>
</template>


<script>
export default {
  data: function () {
    return {
     // message: "Hello Vue! esto es un componente separado"
    }
  }
}
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>
