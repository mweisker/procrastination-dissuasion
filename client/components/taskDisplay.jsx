import React, { useState, useEffect } from "react";
import DatePicker from 'react-datepicker';
import './taskForm.scss';


const taskDisplay = ({ taskData }) => {

  const { title, description, status, duedate } = taskData

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
      <br></br>

    </div>
  );
};

export default taskDisplay;