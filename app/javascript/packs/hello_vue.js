/* eslint no-console: 0 */
// Run this example by adding <%= javascript_pack_tag 'hello_vue' %> (and
// <%= stylesheet_pack_tag 'hello_vue' %> if you have styles in your component)
// to the head of your layout file,
// like app/views/layouts/application.html.erb.
// All it does is render <div>Hello Vue</div> at the bottom of the page.

//import Vue from 'vue'
//import App from '../app.vue'

//document.addEventListener('DOMContentLoaded', () => {
  //const app = new Vue({
   // render: h => h(App)
//  }).$mount()
//  document.body.appendChild(app.$el)

//  console.log(app)
//})


// The above code uses Vue without the compiler, which means you cannot
// use Vue to target elements in your existing html templates. You would
// need to always use single file components.
// To be able to target elements in your existing html/erb templates,
// comment out the above code and uncomment the below
// Add <%= javascript_pack_tag 'hello_vue' %> to your layout
// Then add this markup to your html template:
//
// <div id='hello'>
 //  {{message}}
  // <app></app>
// </div>


 import Vue from 'vue/dist/vue.esm'
 import App from '../app.vue'

 document.addEventListener('DOMContentLoaded', () => {
   const app = new Vue({
     el: '#hello',
     data: {
        tasks: [
            {   
                id:1, 
                name:'Todo 1', 
                description: 'This is a todo', 
                completed: false
            },
            {   
                id:2, 
                name:'Todo 2', 
                description: 'this is the todo number 2', 
                completed: true
            },
            {   
                id:3, 
                name:'Todo 3', 
                description: 'This is todo number 3', 
                completed: true  
            }, 
            {   
                id:4, 
                name:'Todo 4', 
                description: 'This is todo number 4', 
                completed: true 
            }
        ],
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
        clear: function(){
            this.task = {};
            this.action = 'create';
            this.message = '';
        },
        updateTask: function(event, id){
            event.stopImmediatePropagation();
            
            
            let task = this.tasks.find(item => item.id == id);
            
            if (task){
                task.name = this.task.name;
                task.description = this.task.description;
                task.completed = this.task.completed;
                this.message = `Task ${id} updated.`
            }
        },
        createTask: function(event){
            event.stopImmediatePropagation();
            
            (!this.task.completed) ? this.task.completed = false : this.task.completed = true;
            let taskId = this.nextId;
            this.task.id = taskId;
            let newTask = Object.assign({}, this.task);
            this.tasks.push(newTask);
            this.clear();
            this.message = `Task ${taskId} created.`
            
        }
    },
    components: { App }
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
