import React, { useState, useEffect } from "react";
import DatePicker from 'react-datepicker';
import './taskForm.scss';


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

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform any necessary validation or submit the form data
    // to the server using an API call.
    // For simplicity, this example just logs the form data.
    if (username === '' || password === '') return alert('Excuse me, how are we going to find your information if you don\'t fill out the form completely?')
    const postFetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({UserName: username, Password: password})
    }
    const findUser = async () => {
      try {
        const findUser = await fetch('/login', postFetchOptions);
        if (findUser.status === 400) return alert('Username or Password does not exist, take a deep breath and try again.  Or if you forgot your login information, just register as a new user.  We don\'t change passwords here')
        const parsedResult = await findUser.json();
        console.log('parsed ', parsedResult);
        const userData = { userId: parsedResult.userid, userName: parsedResult.username };
        props.setUserInfo(userData);
        navigate('/main-page');
        
      } catch (err) {
        console.log(`Error in findUser: ${err}`)
      }
    }
    findUser();
  };
  const date = new Date()
  console.log(date);
  console.log(dueDate);

  const difference = dueDate - date;
  const differenceDays = Math.ceil(difference / (1000 * 60 * 60 * 24));

  console.log(differenceDays)


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
      <button type="submit">Submit</button>
    </form>
  );
};

export default taskForm;