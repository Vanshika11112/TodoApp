import React, { useEffect, useState } from "react";
import { Button, FormControl, Input, InputLabel } from "@mui/material";
import "./App.css";
import Todo from "./ToDo.js";
import db from "./firebase.js";
import { query, collection, onSnapshot, addDoc } from "firebase/firestore";


function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let todosArr = [];
      QuerySnapshot.forEach((doc) => {
        todosArr.push({ id: doc.id, data: doc.data() });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe();
  }, []);

  const addTodo = async (event) => {
    event.preventDefault();

    // Add the new todo to Firestore
    await addDoc(collection(db, "todos"), {
      text: input,
    });

    setInput(""); // Clear up input after submit
  };

  return (
    
    <div className="App">
      <h1>TaskMaster📝</h1>
      <br></br>
      <FormControl type="submit">
        <InputLabel>Write your task here✏️</InputLabel>
        <Input
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
      </FormControl>
      <Button
        disabled={!input}
        onClick={addTodo}
        type="submit"
        variant="contained"
      >
           Add Tasks
      </Button>
      <ul>
        {todos.map((todo, index) => (
          <Todo key={index} todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default App;
