import React, { useState, useEffect } from "react";
import "./App.css";
import { Button, FormControl, InputLabel, Input } from "@material-ui/core";
import Todo from "./Todo";
import db from "./firebase";
import firebase from "firebase";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  // console.log(input);

  //when the app loads, we need to listen to the database and fetch new todos as they get added/removed
  useEffect(() => {
    //this code runs when the app.js loads
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        // console.log(setTodos(snapshot.docs.map((doc) => doc.data().todo)));
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
        ); //returns a  array of strings
      });
  }, []);
  // //empty array stores dependecies
  // a) null array means the useEffect will load only once when app is fired initially or page is refreshed
  // b) but ex [input] has its field as input so thenever there is change in input the app loads again with useeffecct hooks

  const addTodo = (e) => {
    //this will fire off when we will click button
    // console.log("I am Working!");
    e.preventDefault(); //this stops the refresh of entire page

    //to update setTodos when we add a custom todo field and not add from database
    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(), //return time of firebase server when a todo task is created which helps in sorting items
    });

    // setTodos([...todos, input]);
    setInput(""); //clearing the input after hitting the submit button
  };

  return (
    <div className="App">
      <h1>
        <span>🤔</span> What's Next <span>🤔</span>
      </h1>
      <br />
      <form>
        <FormControl>
          <InputLabel>✅ Write a Todo task...</InputLabel>
          <Input
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
        </FormControl>

        <Button
          disabled={!input}
          type="submit"
          onClick={addTodo}
          variant="contained"
          color="primary"
        >
          Add Todo...
        </Button>
      </form>
      <ul>
        {todos.map((todo) => (
          <Todo todo={todo} />
        ))}
      </ul>
    </div>
  );
};

export default App;
