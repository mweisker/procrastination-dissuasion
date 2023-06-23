import React, { useState, useEffect } from "react";
import DatePicker from 'react-datepicker';
import './taskForm.scss';


const taskDisplay = ({ taskData, setNewData }) => {

  const { title, description, status, duedate, taskid } = taskData

  const dueDateObject = new Date(duedate);

  const date = new Date();
  const difference = dueDateObject - date;
  const differenceDays = Math.ceil(difference / (1000 * 60 * 60 * 24))


  const readableDate = dueDateObject.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  console.log(readableDate)

  const handleDelete = async () => {
    console.log(taskData)
    const deleted = await fetch(`/task/${taskid}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    setNewData(true);
  }



  return (
    <div>
      <div>
      Title: {title}
      </div>
      <div>
      Description: {description}
      </div>
      <div>
      Status: {status}
      </div>
      <div>
      Due Date: {readableDate}  
      </div>
      <div>
      Days left: {differenceDays}  
      </div>
      <button>Edit</button>
      <button onClick={handleDelete} >Delete</button>
      <br></br>

    </div>
  );
};

export default taskDisplay;