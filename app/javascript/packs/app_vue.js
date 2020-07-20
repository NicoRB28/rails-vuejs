import Vue from 'vue/dist/vue.esm'

const Api = require('./api');

document.addEventListener('DOMContentLoaded', () => {

Vue.component('task',{
    props:['task'],
    template:
        `
           <div class="ui segment task" v-bind:class="task.completed ? 'done' : 'todo'"> 
              <div class="ui grid">
                <div class="row">
                    <div class="left floated twelve wide column">
                        <div class="ui checkbox">
                            <input type="checkbox" name="task" v-on:click="toggleDone($event, task.id)" :checked="task.completed">
                            <label>{{task.name}}<span class="description">{{task.description}}</span></label>
                        </div>
                    </div>
                    <div class="right floated three wide column">
                        <i class="icon pencil" alt="Edit" v-on:click="editTask(task.id)"></i>
                        <i class="icon trash" alt="Delete" v-on:click="deleteTask($event, task.id)"></i>
                    </div>
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
               this.task = task;
               
               Api.updateTask(this.task).then(function(response){
                   app.listTasks();
                   app.clear();
                   let status = (response.completed) ? 'completed' : 'in progress';
                   app.message = `Task ${response.id} is ${status} .`
               })
           }
       },
       editTask: function(id){
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
               Api.deleteTask(id).then(function(response){
                    app.$delete(app.tasks, taskIndex)
                    app.message = `Task ${id} deleted.`;
               });
           }
       }
   }
})
 var app =  new Vue({
     el: '#app',
     data: {
        tasks:[], 
        task: {},
        message: '',
        action: 'create'
    },
    computed:{
        completedTasks: function(){
            return this.tasks.filter( item => item.completed == true );      
        },
        todoTasks: function(){
            return this.tasks.filter( item => item.completed == false);
        },
        nextId: function(){
            return (this.tasks.sort(function(a,b){return a.id - b.id;}))[this.tasks.length - 1].id + 1;
        }
       
    },
    methods:{
         listTasks: function(){
           Api.listTasks().then(function(response){
                app.tasks = response;
           });
        },
        clear: function(){
            this.task = {};
            this.action = 'create';
            this.message = '';
        },
        updateTask: function(event, id){
            event.stopImmediatePropagation();
            
            Api.updateTask(this.task).then(function(response){
                app.listTasks();
                app.clear();
                app.message = `Task ${response.id} updated.`;
            });
            
        },
        createTask: function(event){
            event.stopImmediatePropagation();
            
            (!this.task.completed) ? this.task.completed = false : this.task.completed = true;
            
            Api.createTask(this.task).then(function(response){
                app.listTasks();
                app.clear();
                app.message = `Task ${response.id} created.`
      
            })

                       
        }
    },
    beforeMount(){this.listTasks()}
    //components: {task}
   });
 })


//
// If the project is using turbolinks, install 'vue-turbolinks':
//
// yarn add vue-turbolinks
//
// Then uncomment the code block below:
//
// import TurbolinksAdapter from 'vue-turbolinks'
// import Vue from 'vue/dist/vue.esm'
// import App from '../app.vue'
//
// Vue.use(TurbolinksAdapter)
//
// document.addEventListener('turbolinks:load', () => {
//   const app = new Vue({
//     el: '#hello',
//     data: () => {
//       return {
//         message: "Can you say hello?"
//       }
//     },
//     components: { App }
//   })
// })
