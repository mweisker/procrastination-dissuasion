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



  return (
    <div>
      { !editTask ? <div>
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
        <button onClick={handleEdit} >Edit</button>
        <button onClick={handleDelete} >Delete</button>
      </div>  : <div>
        < TaskEdit setEditTask={setEditTask} taskData={taskData} />
      </div> }

    </div>
  );
};

export default taskDisplay;