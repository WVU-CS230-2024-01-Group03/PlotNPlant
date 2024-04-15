import { Calendar } from 'rsuite';
import React from 'react';
import { Link } from 'react-router-dom';
import './Cal.css';
import {Whisper, Popover, Badge } from 'rsuite';

//Partial implementation of the custom events

//Function to convert hours from military time to standard
function convertHours(hours){
    if(hours > 12){
      hours = hours - 12;
    }
    return hours;
}

//Function for standard time to check am or pm
function timeofDay(hours){
    if(hours > 12){
      return "pm";
    }
    return "am";
}

function newTodo (){
  //Gets the input for the new todo's title
  var input = document.getElementById("newTodo").value;
  //Get input from the date in form
  var date = new Date(document.getElementById("dateInput").value);
  //Gets the day from the date variable
  const day = date.getDate();
  //Gets the hour from the date variable
  const hours = date.getHours();
  //Converts the hours from military to standard
  const converted = convertHours(hours);
  //Checks the time of day for standard time
  const timeDay = timeofDay(hours);
  //Gets the minitues from date variable
  const mins = date.getMinutes();
  //Sets time equal to the time that will display on the calendar
  const time = converted + ":" + mins + " " + timeDay;
  //Sets dateTime equal to the day i need plus the word time in order to get from Local Host later.
  const dayTime = day + "time";
  //Sets the input for the specific day
  localStorage.setItem(day,input);
  //Sets the time for the specific day
  localStorage.setItem(dayTime, time);

}

//Custom getTodoList function to get the todo list for custom events
function getTodoList(date) {
  //Gets the day from the date variable
  const day = date.getDate();
  //Checks to see if localStorage has an event for that day
  if(localStorage.getItem(day) != null){
    //Stores the dayTime variable to retrieve the time from localStorage
    const dayTime = day + "time";
    //Returns the event for that specific day
    return [
      {time: localStorage.getItem(dayTime), title: localStorage.getItem(day)}
    ];
  }
  return [];
}

//Clear method to clear the calendar
function clear(){
  localStorage.clear();
  window.location.reload();
}

//This is the method that has the hard coded events to the table
//date returns dayOfWeek, month, year, time, timezone
//Ex Fri Apr 12 2024 13:49:44 GMT-0400 (Eastern Daylight Time)
//This is just to look back incase things to wrong
// function getTodoList(date) {
//   const day = date.getDate();
//   // const month = date.getMonth();
//   switch (day) {
//     case 12:
//       return [
//         { time: '10:30 am', title: localStorage.getItem(12) }
//       ];
//     case 15:
//       return [
//         { time: '3:00 pm', title: 'Tomato' }
//       ];
//     default:
//       return [];
//   }
// }

function renderCell(date) {
  const list = getTodoList(date);
  const displayList = list.filter((item, index) => index < 2);

  if (list.length) {
    const moreCount = list.length - displayList.length;
    const moreItem = (
      <li>
        <Whisper
          placement="top"
          trigger="click"
          speaker={
            <Popover>
              {list.map((item, index) => (
                <p key={index}>
                  <b>{item.time}</b> - {item.title}
                </p>
              ))}
            </Popover>
          }
        >
          <a>{moreCount} more</a>
        </Whisper>
      </li>
    );

    return (
      <ul className="calendar-todo-list">
        {displayList.map((item, index) => (
          <li key={index}>
            <Badge /> <b>{item.time}</b> - {item.title}
          </li>
        ))}
        {moreCount ? moreItem : null}
      </ul>
    );
  }

  return null;
}
function Cal() {

    return (
      <div className="Cal">
        <title>Plot N' Plant</title>
        <h1>Plot N' Plant</h1>
        <p><Link to="/homePage">
        <img src="https://cdn1.iconfinder.com/data/icons/icons-for-a-site-1/64/advantage_eco_friendly-128.png" alt = "Plant"></img>
        </Link></p>
        <h2>New Event</h2>
        <form onSubmit={newTodo}>
          <div>
            <input type="datetime-local" id="dateInput" /><br/>
            <input type="text" id="newTodo" placeholder='Todo Message' className="text-input" />
          </div>
        </form>
        {<Calendar compact bordered  renderCell={renderCell}/>}
        <button onClick={clear}>Clear</button>
      </div>
    );
    }

  export default Cal;