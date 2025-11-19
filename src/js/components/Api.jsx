import React, { useEffect, useState } from "react";

const Api = () => {
    const API_URL = "https://playground.4geeks.com/todo";

    let [todos, setTodos] = useState([]);
    let [task, setTask] = useState("");
    let [hoverIndex, setHoverIndex] = useState(null);

    const crearUsuario = () => {
        fetch(API_URL + "/users/SantiagoC", {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        })
            .then(response => response.json())
            .then(data => console.log("Usuario creado:", data))
            .catch(error => console.log(error));
    };

    const traerLista = () => {
        fetch(API_URL + "/users/SantiagoC")
            .then(response => {
                if (response.status === 404) {
                    crearUsuario();
                }
                return response.json();
            })
            .then(data => {
                setTodos(data.todos || []);
            })
            .catch(error => console.log(error));
    };

    useEffect(() => {
        traerLista();
    }, []);

    const crearTarea = () => {
        if (task.trim() === "") return;

        fetch(API_URL + "/todos/SantiagoC", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                label: task,
                is_done: false
            })
        })
            .then(response => response.json())
            .then(() => {
                setTask("");
                traerLista();
            })
            .catch(error => console.log(error));
    };

    const borrarTarea = (id) => {
        fetch(API_URL + "/todos/" + id, {
            method: "DELETE"
        })
            .then(response => response.json())
            .then(() => traerLista())
            .catch(error => console.log(error));
    };

    const borrarUsuario = () => {
        fetch(API_URL + "/users/SantiagoC", {
            method: "DELETE"
        })
            .then(response => response.json())
            .then(data => {
                console.log("Usuario eliminado:", data);
                traerLista();
            })
            .catch(error => console.log(error));
    };

    return (
        <div>
            <div className="todo-container">
                <h1 className="todo-title">todos</h1>

                <input
                    type="text"
                    className="todo-input"
                    placeholder="What needs to be done?"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") crearTarea();
                    }}
                />

                <ul className="todo-list">
                    {todos && todos.length > 0 ? (
                        todos.map((item, index) => (
                            <li className="todo-item" key={index}>
                                {item.label}
                                <button
                                    className="delete-btn"
                                    onClick={() => borrarTarea(item.id)}
                                >
                                    X
                                </button>
                            </li>
                        ))
                    ) : (
                        <li className="todo-item">No hay tareas, añadir tareas</li>
                    )}
                </ul>

                <p className="counter">Quedan {todos ? todos.length : 0} tareas</p>
                <button className="clear-btn" onClick={borrarUsuario}>
                    Eliminar todas las tareas
                </button>
            </div>

            <div className="paper"></div>
        </div>
    );
};

export default Api;