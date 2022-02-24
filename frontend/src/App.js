import { useQuery, gql } from "@apollo/client";
import useCreateTodo from "./mutations/createTodo";
import useUpdateTodo from "./mutations/updateTodo";
import useDeleteTodo from "./mutations/deleteTodo";

import React, { useEffect, useState } from "react";
import "./App.css";
import { Button, Card, Form, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Todo({ todo, index, markTodo, removeTodo }) {
    return (
        <div className="todo">
            <span style={{ textDecoration: todo.done ? "line-through" : "" }}>
                {todo.text}
            </span>
            <div>
                <Button
                    variant="outline-success"
                    onClick={() => markTodo(index)}
                >
                    ✓
                </Button>{" "}
                <Button
                    variant="outline-danger"
                    onClick={() => removeTodo(index)}
                >
                    ✕
                </Button>
            </div>
        </div>
    );
}

function FormTodo({ addTodo }) {
    const [value, setValue] = React.useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!value) return;
        addTodo(value);
        setValue("");
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>
                    <b>Add Todo</b>
                </Form.Label>
                <Form.Control
                    type="text"
                    className="input"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Add new todo"
                />
            </Form.Group>
            <Button variant="primary mb-3" type="submit">
                Submit
            </Button>
        </Form>
    );
}

function App() {
    const TODO_QUERY = gql`
        query Todos {
            todos {
                id
                done
                text
            }
        }
    `;

    const { data, loading, error } = useQuery(TODO_QUERY);
    const createTodo = useCreateTodo();
    const updateTodo = useUpdateTodo();
    const deleteTodo = useDeleteTodo();

    const [todos, setTodos] = useState([]);

    useEffect(() => {
        if (!loading && !error && data) {
            setTodos(data.todos);
        }
    }, [loading, data, error]);

    const addTodo = async (text) => {
        const { data } = await createTodo({ text: text });
        const newTodos = [...todos, data.createTodo];
        console.log(todos, newTodos);
        setTodos(newTodos);
    };

    const markTodo = (index) => {
        const newTodos = [...todos];
        newTodos[index] = { ...todos[index], done: !todos[index].done };
        setTodos(newTodos);
        updateTodo(newTodos[index]);
    };

    const removeTodo = async (index) => {
        await deleteTodo(todos[index].id);
        const newTodos = todos.filter(({ id }) => id !== todos[index].id);
        setTodos(newTodos);
    };

    if (loading)
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        );

    return (
        <div className="app">
            <div className="container">
                <h1 className="text-center mb-4">Todo List</h1>
                <FormTodo addTodo={addTodo} />
                <div>
                    {todos.map((todo, index) => (
                        <Card key={index}>
                            <Card.Body>
                                <Todo
                                    key={index}
                                    index={index}
                                    todo={todo}
                                    markTodo={markTodo}
                                    removeTodo={removeTodo}
                                />
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
