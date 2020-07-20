import axios from 'axios'

export async function listTasks () {
    return axios.get('/tasks.json')
                .then(function(response){
                    return response.data;
                })
}
export async function createTask (task){
    
    return axios.post('/tasks.json', task)
                .then(function(response){
                    return response.data;
                })
                .catch(function(error){
                    console.log(error);
                })
}
export async function updateTask(task){
    var localTask = {name: task.name,
                     description: task.description,
                     completed: task.completed
                    }
    return axios.put(`/tasks/${task.id}.json`, localTask)
                .then(function(response){
                    return response.data;
                })
                .catch(function(error){
                    console.log(error);
                })
}
export async function deleteTask(id){
   axios.delete(`/tasks/${id}.json`)
        .then(function(response){
             return 'success';
        })
        .catch(function(error){
             console.log(error);
        })
}
