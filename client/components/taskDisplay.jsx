import React, { useState, useEffect } from "react";
import TaskEdit from '../components/taskEdit.jsx';

const taskDisplay = ({ taskData, setNewData }) => {
  const [editTask, setEditTask] = useState(false);

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

  useEffect(() => {
    if (editTask === false) setNewData(true);
  }, [editTask])

  const handleDelete = async () => {
    const deleted = await fetch(`/task/${taskid}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    setNewData(true);
  }

  const handleEdit = () => {
    setEditTask(true);
  }

  let border = '#FFFFFF';

  if (status === 'Completed') {
    border = '#50c878';
  } else if (status === 'Given Up') {
    border = '#899499'
  } else if (differenceDays === 1) {
    border = '#FAFA33'
  } else if (differenceDays === 0) {
    border = '#E0115F'
  }


  return (
    <div>
      { !editTask ? <div style={{border: `1px solid ${border}` }} className="task-display">
        <div className="task-title task-container">
          <h4>Title:</h4>
          <p>{title}</p>
        {/* Title: {title} */}
        </div>
        <div className="task-status task-container">
          <h4>Status:</h4>
          <p>{status}</p>
        {/* Status: {status} */}
        </div>
        <div className="task-description task-container">
          <h4>Description:</h4>
          <p>{description}</p>
        {/* Description: {description} */}
        </div>
        <div className="task-due-date task-container">
          <h4>Due Date:</h4>
          <p>{readableDate}</p>
        {/* Due Date: {readableDate}   */}
        </div>
        <div className="task-days-left task-container">
          <h4>Days Left:</h4>
          <p>{differenceDays}</p>
        {/* Days left: {differenceDays}   */}
        </div>
        <div className="task-options">
          <button onClick={handleEdit} >Edit</button>
          <button onClick={handleDelete} >Delete</button>
        </div>
      </div>  : <div>
        < TaskEdit setEditTask={setEditTask} taskData={taskData} />
      </div> }

    </div>
  );
};

export default taskDisplay;