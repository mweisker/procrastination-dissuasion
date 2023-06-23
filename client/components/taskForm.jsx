import React, { useState, useEffect } from "react";
import DatePicker from 'react-datepicker';

const taskForm = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("In Progress");
  const [dueDate, setDueDate] = useState(null);

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
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({Title: title, Description: description, Status: status, DueDate: dueDate, UserId: props.userId})
    }
    const addTask = async () => {
      try {
        const addTask = await fetch('/task', postFetchOptions);
        if (addTask.status === 400) return alert('Something is wrong')
        const parsedResult = await addTask.json();
        props.setNewData(true);
        setTitle('');
        setDescription('');
        setStatus('In Progress');
        setDueDate(null);
      } catch (err) {
        console.log(`Error in addTask: ${err}`)
      }
    }
    addTask();
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="input-section">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
        />
      </div>
      <div className="input-section">
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={handleDescriptionChange}
        />
      </div>
      <div className="input-section">
      <label htmlFor="status">State:</label>
      <select id="status" value={status} onChange={handleStatusChange}>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
        <option value="Given Up">Given Up</option>
      </select>
    </div>
    <div className="input-section">
        <label htmlFor="dueDate">Due Date:</label>
        <DatePicker
          id="dueDate"
          selected={dueDate}
          onChange={handleDueDate}
          dateFormat="dd/MM/yyyy"
          placeholderText="Select a date"
        />
    </div>
    <div className="input-section">
      <label>Submit</label>
      <button type="submit"></button>

    </div>
    </form>
  );
};

export default taskForm;