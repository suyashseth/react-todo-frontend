import axios from "axios"

class TodoDataService{

    retriveAllTodos(name){
        return axios.get(`http://localhost:8080/todo/users/${name}`)
    }

    deleteTodo(name,id){
        return axios.delete(`http://localhost:8080/todo/users/${name}/${id}`)
    }

    retrieveTodo(name, id){
        return axios.get(`http://localhost:8080/todo/users/${name}/${id}`)
    }

    updateTodo(name, id, todo){
        return axios.put(`http://localhost:8080/todo/users/${name}/${id}`, todo)
    }

    createTodo(name,todo){
        return axios.post(`http://localhost:8080/todo/users/${name}`, todo)
    }



}

export default new TodoDataService()