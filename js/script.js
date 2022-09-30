///////////////////////////// API ///////////////////////////


const Api = (() => {
    // const baseUrl = 'http://jsonplaceholder.typicode.com'
    const baseUrl = 'http://localhost:4232'
    const todoPath = "todos"
    
    async function getTodos() {
        const res = await fetch([baseUrl, todoPath].join("/"))
        const data = await res.json()
        return await data
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

console.log(Api.getTodos())


///////////////////////////// VIEW ///////////////////////////

const View = (() =>{
    const dmstr = {
        toDoContainer: '#toDoContainer',
        dltBtn: ".dltBtn",
        input: "#toDoInput",
    }
    console.log(dmstr.toDoContainer + ' line 40')
    const render = (ele, tmp) => {
        console.log('render')
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

    return {render, createTmp, dmstr}
})();


///////////////////////////// MODEL ///////////////////////////

const Model = ((api, view) => {
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
            console.log('hello');
            return this.#todoList
        }
        set todoList(newTodoList) {
            this.#todoList = newTodoList
            const toDoContainer = document.querySelector(view.dmstr.toDoContainer)
            console.log(toDoContainer)
            const tmp = view.createTmp(this.#todoList)
            View.render(toDoContainer, tmp)
        }
    }

    return {getTodos, deleteTodo, addTodo, State, Todo}

})(Api, View)


///////////////////////////// CONTROLLER ///////////////////////////

const Controller = ((model, view) => {
    const state = new model.State()

    const deleteTodo = () => {
        const toDoContainer = document.querySelector(view.dmstr.toDoContainer)
        toDoContainer.addEventListener("click", (evt) =>{
            if(evt.target.className === "dltBtn"){
                state.todoList = state.todoList.filter((todo) => {
                    +todo.id !== evt.target.id
                })
                model.deleteTodo(evt.target.id)
            }
        })
    }

    const addTodo = () => {
        const inputBx = document.querySelector(view.dmstr.input)
        inputBx.addEventListener("keyup", (event) => {
            if(event.key === "Enter" && event.target.value.trim() !== ''){
                const newTodo = new model.Todo(
                    event.target.value
                )

                model.addTodo(newTodo).then((todo) => {
                    state.todoList = [todo, ...state.todoList]
                })

                event.target.value = ''
            }
        })
    }

    const init = () => {
        console.log('init')
        console.log(model.getTodos())
        model.getTodos().then((todos) => {
            state.todoList = todos
        })
    }

    const returnFn = () => {
        init()
        deleteTodo()
        addTodo()
    }

    return {returnFn}
})(Model, View)

Controller.returnFn()