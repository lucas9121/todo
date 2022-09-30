///////////////////////////// API ///////////////////////////

const Api = (() => {
    const baseUrl = 'https://jsonplaceholder.typicode.com'
    // const baseUrl = 'https://localhost:4232'
    const todoPath = "todos"

    const getTodos = () =>{
        fetch([baseUrl, todoPath].join("/")).then((res) => res.json())
    }

    const deleteTodo = (id) => {
        fetch([baseUrl, todoPath, id].join("/"), {
            method: "DELETE",
        })
    }

    const addTodo = (newTodo) => {
        fetch([baseUrl, todoPath].join("/"), {
            method: "POST",
            body: JSON.stringify(newTodo),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
        }).then((res) => res.json())
    }
    return {getTodos, deleteTodo, addTodo}
})();


///////////////////////////// VIEW ///////////////////////////

const View = (() =>{
    const dmstr = {
        toDoContainer: '#toDoContainer',
        dltBtn: ".dltBtn",
        input: "#toDoInput",
    }

    const render = (ele, tmp) => {
        ele.innerHTML = tmp
    }

    const createTmp = (arr) => {
        let tmp = ""
        for(let ele of arr){
            tmp += `
            <li>
                <span>${ele.id} - ${ele.title}</span>
                <button id="${ele.id}" clas="dltBtn">X</button>
            </li>
            `
        }
        return tmp
    }

    return {dmstr, render, createTmp}
})();


///////////////////////////// MODEL ///////////////////////////

const Model = (() => {
    const {getTodos, deleteTodo, addTodo} = api

    class Todo {
        constructor(title){
            this.userId = 1;
            this.title = title;
            this.completed = false;
        }
    }

    class State {
        #todoList = [];

        get todoList() {
            return this.#todoList
        }
        set todoList(newTodoList) {
            this.#todoList = newTodoList
            const toDoContainer = document.querySelector(view.dmstr.toDoContainer)
            const tmp = view.createTmp(this.#totodoList)
            view.render(toDoContainer, tmp)
        }
    }

    return {getTodos, deleteTodo, addTodo, State, Todo}

})(Api, View)