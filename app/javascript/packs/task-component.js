 Vue.component('task',{
    props:['task'],
    template:
        `
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
        `, 
   methods:{
        findTask: function(id){
            return app.tasks.find(item => item.id == id);
        },
       toggleDone: function(event, id){
           event.stopImmediatePropagation();
           let task = this.findTask(id);
           if(task){
               task.completed = !task.completed;
               app.message = `Task $${id} updated.`
           }
       },
       editTask: function(event, id){
            app.action = 'edit';
           let task = this.findTask(id);
           if(task){
               app.task = {
                   id: task.id,
                   name: task.name,
                   description: task.description,
                   completed: task.completed
               };
             }
       },
       deleteTask: function(event, id){
            event.stopImmediatePropagation();
           let taskIndex = app.tasks.findIndex(item => item.id == id);
           if(taskIndex >= 0){
                app.$delete(app.tasks, taskIndex);
               app.message = `Task ${id} deleted.`
           }
       }
   }
})
