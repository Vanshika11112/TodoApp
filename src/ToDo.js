

import { Button, List, ListItem, ListItemText ,TextField} from '@mui/material'
import React, { useState } from 'react'
import './ToDo.css';
import db from './firebase.js';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';

function ToDo({ todo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedText, setUpdatedText] = useState(todo.data.text);

  const handleUpdate = async () => {
    try {
      await updateDoc(doc(db, "todos", todo.id), {
        text: updatedText,
        // Add other fields you may want to update
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "todos", todo.id));
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  };

  return (
    <List className='todo-list'>
      <ListItem>
        {isEditing ? (
          <>
            <TextField label="Update your data" color="secondary" focused   type="text"
              value={updatedText}
              onChange={(e) => setUpdatedText(e.target.value)} style={{marginLeft:"30%"}}/>
           
            <Button
              style={{ backgroundColor: '#ad6aea', color: 'white', borderRadius: '10px', marginLeft: "auto" }}
              onClick={handleUpdate}
            >
              Update
            </Button>
          </>
        ) : (
          <>
            <ListItemText style={{ marginLeft: "30%" }} primary={todo.data.text}></ListItemText>
            <Button
              style={{ backgroundColor: '#ad6aea', color: 'white', borderRadius: '10px', marginLeft: "auto", marginRight: "5%"}}
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
          </>
        )}
        <Button
          style={{ backgroundColor: '#ad6aea', color: 'white', borderRadius: '10px', marginLeft: "auto", marginRight: "30%"}}
          onClick={handleDelete}
        >
          Delete

        </Button>
      </ListItem>
    </List>
  )
}

export default ToDo;