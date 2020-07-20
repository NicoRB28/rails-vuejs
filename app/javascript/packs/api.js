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
