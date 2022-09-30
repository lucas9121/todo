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