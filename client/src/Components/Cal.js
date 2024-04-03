import { Calendar } from 'rsuite';
import React from 'react';
import { Link } from 'react-router-dom';
import './Cal.css';
import {Whisper, Popover, Badge } from 'rsuite';

//WIP
// const todo = new Map();

// function newTodo (){
//   var date = document.getElementById("day").value;
//   var text = document.getElementById("info").value;
//   todo.set(date, text);
// }


function getTodoList(date) {
  const day = date.getDate();

  switch (day) {
    case 12:
      return [
        { time: '10:30 am', title: 'Green Beans' },
        { time: '12:00 pm', title: 'Peppers' }
      ];
    case 15:
      return [
        { time: '3:00 pm', title: 'Tomato' }
      ];
    default:
      return [];
  }
}

//WIP
// function getTodoList() {
//   const day = document.getElementById("day").value;
//   if(todo.get(day)){
//     return todo.get(day);
//   }
//   return [];
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
        <img src="https://cdn1.iconfinder.com/data/icons/icons-for-a-site-1/64/advantage_eco_friendly-128.png" alt = "Plant"></img>
        <p><Link to="/">Login</Link></p>
        <form>
          <label for="newEvent">New Event:</label>
          <input type="date" id="day" name="date"></input><br></br>
          <label for="notes">Information:</label>
          <input type="text" id="info" name="info"></input>
          <button onclick="newTodo()">Click me</button>
        </form>
        {/* <Calendar compact bordered  /> */}
        {<Calendar compact bordered  renderCell={renderCell}/>}
      </div>
    );
    }

  export default Cal;