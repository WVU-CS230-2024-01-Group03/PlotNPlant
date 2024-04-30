import { Calendar } from 'rsuite';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Cal.css';
import {Whisper, Popover, Badge } from 'rsuite';
import { doc, setDoc, collection, getDocs, deleteDoc} from "firebase/firestore";
import { db, auth } from "../Config/firebase";
import { onAuthStateChanged } from "firebase/auth";



function Cal() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        FetchEvents(user.uid);
      } else {
        console.error("No user signed in");
        setLoading(false); // Set loading to false when no user is signed in
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    FetchEvents();
  }, []);

  const FetchEvents = async (userId) => {
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
        console.log("Fetched events:", eventsData);
        setEvents(eventsData);
      } else {
        console.error("No user signed in");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching events:", error);
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    FetchEvents();
  };

  const renderCell = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const eventsForDate = events.filter(event => {
      const eventDate = new Date(event.id);
      return (
        eventDate.getFullYear() === year &&
        eventDate.getMonth() + 1 === month &&
        eventDate.getDate() === day
      );
    });

    if (eventsForDate.length > 0) {
      return (

        <ul>Crops Planted
          {eventsForDate.map((event, index) => (
            <li key={index}>
              {event.title}
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

      const userEventRef = doc(collection(db, "userStorage", userId, "userevents"), dateTime);
      try {
        await setDoc(userEventRef, {
          title: title,
          dateTime: dateTime // Add dateTime to the document data
        });
        console.log("Event added successfully");
        FetchEvents(); // Fetch events after adding a new event
      } catch (error) {
        console.error("Error adding event: ", error);
      }
    } else {
      alert("No user signed in");
    }
  }

  function clear() {
    window.location.reload();
  }

  async function removeEvent(event, title) {
    event.preventDefault();

    const currentUser = auth.currentUser;
    if (currentUser) {
      const userId = currentUser.uid;
      const userEventRef = collection(db, "userStorage", userId, "userevents");
      try {
        const querySnapshot = await getDocs(userEventRef);
        querySnapshot.forEach(async (doc) => {
          if (doc.data().title === title) {
            await deleteDoc(doc.ref);
            console.log("Event deleted successfully");
            FetchEvents(); // Fetch events after deleting an event
          }
        });
      } catch (error) {
        console.error("Error deleting event: ", error);
      }
    } else {
      alert("No user signed in");
    }
  }

  return (
    <div className="Cal">
      <div className='Cal-background'></div>
      <h1>Plot N' Plant</h1>
      <p><Link to="/homePage">
        <img src="https://cdn1.iconfinder.com/data/icons/icons-for-a-site-1/64/advantage_eco_friendly-128.png" alt = "Plant"></img>
        </Link></p>
      <h2>Calendar</h2>
      <div className="addEvent">
        <h2>New Event</h2>
        <form onSubmit={newTodo}>
          <div>
            <input type="datetime-local" id="dateInput" /><br />
            <input type="text" id="newTodo" placeholder='Crops Planted' className="text-input" />
          </div>
          <button type="submit">Add Event</button>
        </form>
      </div>
      <div className="calendar-container">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Calendar bordered renderCell={renderCell} />
        )}
      </div>
      <div className='eventBtns'>
        <h2>Delete Event</h2>
        <form onSubmit={(event) => removeEvent(event, document.getElementById("newDelete").value)}>
          <input type="text" id="newDelete" placeholder="Title of event to delete" className="text-input" />
          <button type="submit">Delete Event</button>
        </form>
      </div>
    </div>
  );
}

export default Cal;
