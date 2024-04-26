import { Calendar } from 'rsuite';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Cal.css';
import {Whisper, Popover, Badge } from 'rsuite';
import { doc, setDoc, collection, getDocs, deleteDoc} from "firebase/firestore";
import { db, auth } from "../Config/firebase";


function Cal() {
  
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userId = currentUser.uid;
        const userEventRef = collection(db, "userStorage", userId, "userevents");
        const querySnapshot = await getDocs(userEventRef);
        const eventsData = [];
        querySnapshot.forEach((doc) => {
          eventsData.push({ id: doc.id, ...doc.data() });
        });
        setEvents(eventsData);
      } else {
        console.error("No user signed in");
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleRefresh = () => {
    fetchEvents();
  };

  const renderCell = (date) => {
    // Extract year, month, and day from the date object
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Month is zero-indexed, so add 1
    const day = date.getDate();
    
    // Find events for the current date
    const eventsForDate = events.filter(event => {
      const eventDate = new Date(event.dateTime);
      return (
        eventDate.getFullYear() === year &&
        eventDate.getMonth() + 1 === month &&
        eventDate.getDate() === day
      );
    });

    // Render events for the current date
    if (eventsForDate.length > 0) {
      return (
        <ul>
          {eventsForDate.map((event, index) => (
            <li key={index}>
              <b>{event.dateTime}</b> - {event.title}
            </li>
          ))}
        </ul>
      );
    }

    return null;
  };

async function newTodo(event) {
  event.preventDefault();
  const title = document.getElementById("newTodo").value;
  const dateTime = document.getElementById("dateInput").value;

  const currentUser = auth.currentUser;
  if (currentUser) {
    const userId = currentUser.uid;

    const userEventRef = collection(db, "userStorage", userId, "userevents");
    try {
      await setDoc(doc(userEventRef), {
        title: title,
        dateTime: dateTime
      });
      console.log("Event added successfully");
    } catch (error) {
      console.error("Error adding event: ", error);
    }
  } else {
    alert("No user signed in");
  }
}
function clear(){
  window.location.reload();
}

async function removeEvent(event){
  event.preventDefault();
  const title = document.getElementById("newTodo").value;

  const currentUser = auth.currentUser;
  if (currentUser) {
    const userId = currentUser.uid;

    const userEventRef = collection(db, "userStorage", userId, "userevents");
    try {
      deleteDoc(userEventRef,title.toString());
      console.log("Event deleted successfully");
    } catch (error) {
      console.error("Error deleting event: ", error);
    }
  } else {
    alert("No user signed in");
  }
}

    return (
      <div className="Cal">
        <div className="Cal-background"></div>
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
          <button type="submit">Add Event</button> 
        </form>
        {<Calendar compact bordered  renderCell={renderCell}/>}
        <div className='eventBtns'>
          <button onClick={handleRefresh}>Refresh Events</button>
          <button onClick={clear}>Clear</button>
          <form onSubmit={removeEvent}> 
            <input type="text" id="newDelete" placeholder="Title of event to delete" classname="text-input"/>
            <button type="submit">Delete Event</button>
          </form>
        </div>
      </div>
    );
  }

  export default Cal;