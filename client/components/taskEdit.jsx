import React, { useState, useEffect } from "react";
import DatePicker from 'react-datepicker';

const taskEdit = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("In Progress");
  const [dueDate, setDueDate] = useState(null);

  useEffect(() => {
    console.log(props.taskData)
    const { title, description, status, duedate } = props.taskData;
    setTitle(title);
    setDescription(description);
    setStatus(status);
    const dueDateObject = new Date(duedate);
    setDueDate(dueDateObject);
  }, [])


  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleDueDate = (event) => {
    setDueDate(event);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (title === '' || dueDate === null) return alert('How are you supposed to remember to do a task if you don\'t even have a title or due date?  It\'s hardly motivating if it\'s empty!')
    const postFetchOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({Title: title, Description: description, Status: status, DueDate: dueDate})
    }

    const addTask = async () => {
      try {
        const addTask = await fetch(`/task/${props.taskData.taskid}`, postFetchOptions);
        if (addTask.status === 400) return alert('Something is wrong')
        const parsedResult = await addTask.json();
        props.setEditTask(false);
      } catch (err) {
        console.log(`Error in addTask: ${err}`)
      }
    }
    addTask();
  };

  const handleDiscardChanges = () => {
    props.setEditTask(false);
  }


  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={handleDescriptionChange}
        />
      </div>
      <div>
      <label htmlFor="status">Select an option:</label>
      <select id="status" value={status} onChange={handleStatusChange}>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
        <option value="Given Up">Given Up</option>
      </select>
    </div>
    <div>
        <label htmlFor="dueDate">Select a Date:</label>
        <DatePicker
          id="dueDate"
          selected={dueDate}
          onChange={handleDueDate}
          dateFormat="dd/MM/yyyy"
          placeholderText="Select a date"
        />
      </div>
      <button type="submit">Save changes</button>
      <button onClick={handleDiscardChanges} >Discard changes</button>
    </form>
  );
};

export default taskEdit;