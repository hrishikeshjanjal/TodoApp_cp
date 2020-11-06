import React, { useState } from "react";
import "./Todo.css";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  ImageIcon,
  Button,
  Modal,
  makeStyles,
} from "@material-ui/core";

import db from "./firebase";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Todo = (props) => {
  // Date date=new Date().toLocaleDateString();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  //update todo
  const updateTodo = () => {
    //update todo with new input text
    db.collection("todos")
      .doc(props.todo.id)
      .set({ todo: input }, { merge: true });
    setOpen(false);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={(e) => {
          setOpen(false);
        }}
      >
        <div className={classes.paper}>
          <h1>I am a model!</h1>
          <input
            placeholder={props.todo.todo}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          ></input>
          <Button onClick={updateTodo}>Update Todo</Button>
        </div>
      </Modal>
      <List className="todo_list">
        <ListItem>
          <ListItemAvatar></ListItemAvatar>
          <ListItemText
            className="todo_task"
            primary={props.todo.todo}
            secondary="Dummy Deadline ⏰"
          />
        </ListItem>
        <Button onClick={(e) => setOpen(true)}>Edit</Button>
        <DeleteForeverIcon
          onClick={(e) => {
            db.collection("todos").doc(props.todo.id).delete();
          }}
        ></DeleteForeverIcon>
      </List>
    </>
  );
};

export default Todo;

// ctrl + p twice to switch between two recent file
//fiter msgs using a cloud function to remove vulgar msgs
