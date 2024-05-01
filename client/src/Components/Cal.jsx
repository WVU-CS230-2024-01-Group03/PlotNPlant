// Import statements for necessary modules and resources
import { Calendar } from 'rsuite'; // Import Calendar component from rsuite library
import React, { useEffect, useState } from 'react'; // Import necessary hooks from React library
import { Link } from 'react-router-dom'; // Import Link component from react-router-dom
import './Cal.css'; // Import CSS file for styling
import { doc, setDoc, collection, getDocs, deleteDoc } from "firebase/firestore"; // Import necessary Firestore functions
import { db, auth } from "../Config/firebase"; // Import Firestore database and authentication
import { onAuthStateChanged } from "firebase/auth"; // Import onAuthStateChanged function from firebase/auth

/**
 * Functional component representing a calendar view with event management functionality.
 */
function Cal() {
  // State variables to manage events and loading status
  const [events, setEvents] = useState([]); // State variable to store events
  const [loading, setLoading] = useState(true); // State variable to manage loading status

  // Effect hook to fetch events when user authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => { // Subscribe to authentication state changes
      if (user) { // Check if user is authenticated
        FetchEvents(user.uid); // Fetch events for authenticated user
      } else {
        console.error("No user signed in"); // Log error if no user is signed in
        setLoading(false); // Set loading to false when no user is signed in
      }
    });

    return () => unsubscribe(); // Clean up subscription on unmount
  }, []);

  // Effect hook to fetch events on component mount
  useEffect(() => {
    FetchEvents(); // Fetch events on component mount
  }, []);

  /**
   * Fetches events from Firebase Firestore for the authenticated user.
   * @param {string} userId - ID of the authenticated user
   */
  const FetchEvents = async (userId) => {
    try {
      const currentUser = auth.currentUser; // Get current authenticated user
      if (currentUser) { // Check if user is authenticated
        const userId = currentUser.uid; // Get user ID
        const userEventRef = collection(db, "userStorage", userId, "userevents"); // Reference to user's events collection
        const querySnapshot = await getDocs(userEventRef); // Get documents from collection
        const eventsData = []; // Array to store events data
        querySnapshot.forEach((doc) => { // Iterate through documents
          eventsData.push({ id: doc.id, ...doc.data() }); // Push document data to events array
        });
        console.log("Fetched events:", eventsData); // Log fetched events
        setEvents(eventsData); // Set events state
      } else {
        console.error("No user signed in"); // Log error if no user is signed in
      }
      setLoading(false); // Set loading to false
    } catch (error) {
      console.error("Error fetching events:", error); // Log error if fetching events fails
      setLoading(false); // Set loading to false
    }
  };

  /**
   * Renders events for a specific date on the calendar.
   * @param {Date} date - Date object for the cell being rendered
   * @returns {JSX.Element} - JSX markup for events on the date
   */
  const renderCell = (date) => {
    const year = date.getFullYear(); // Get year from date
    const month = date.getMonth() + 1; // Get month from date
    const day = date.getDate(); // Get day from date

    const eventsForDate = events.filter(event => { // Filter events for the specific date
      const eventDate = new Date(event.id); // Convert event ID to Date object
      return (
        eventDate.getFullYear() === year && // Check if event year matches
        eventDate.getMonth() + 1 === month && // Check if event month matches
        eventDate.getDate() === day // Check if event day matches
      );
    });

    if (eventsForDate.length > 0) { // Check if there are events for the date
      return (
        <ul>Crops Planted {/* Unordered list of crops planted */}
          {eventsForDate.map((event, index) => ( // Map through events for the date
            <li key={index}>
              {event.title} {/* Display event title */}
            </li>
          ))}
        </ul>
      );
    }

    return null; // Return null if no events for the date
  };

  /**
   * Adds a new event to the Firebase Firestore.
   * @param {Event} event - Form submission event
   */
  async function newTodo(event) {
    event.preventDefault(); // Prevent default form submission behavior
    const title = document.getElementById("newTodo").value; // Get title from input field
    const dateTime = document.getElementById("dateInput").value; // Get date and time from input field

    const currentUser = auth.currentUser; // Get current authenticated user
    if (currentUser) { // Check if user is authenticated
      const userId = currentUser.uid; // Get user ID

      const userEventRef = doc(collection(db, "userStorage", userId, "userevents"), dateTime); // Reference to user's event document
      try {
        await setDoc(userEventRef, { // Set document data
          title: title, // Set event title
          dateTime: dateTime // Set event date and time
        });
        console.log("Event added successfully"); // Log success message
        FetchEvents(); // Fetch events after adding a new event
      } catch (error) {
        console.error("Error adding event: ", error); // Log error if adding event fails
      }
    } else {
      alert("No user signed in"); // Alert user if no user is signed in
    }
  }

  /**
   * Removes an event from the Firebase Firestore.
   * @param {Event} event - Form submission event
   * @param {string} title - Title of the event to be deleted
   */
  async function removeEvent(event, title) {
    event.preventDefault(); // Prevent default form submission behavior

    const currentUser = auth.currentUser; // Get current authenticated user
    if (currentUser) { // Check if user is authenticated
      const userId = currentUser.uid; // Get user ID
      const userEventRef = collection(db, "userStorage", userId, "userevents"); // Reference to user's events collection
      try {
        const querySnapshot = await getDocs(userEventRef); // Get documents from collection
        querySnapshot.forEach(async (doc) => { // Iterate through documents
          if (doc.data().title === title) { // Check if document title matches the title to be deleted
            await deleteDoc(doc.ref); // Delete document
            console.log("Event deleted successfully"); // Log success message
            FetchEvents(); // Fetch events after deleting an event
          }
        });
      } catch (error) {
        console.error("Error deleting event: ", error); // Log error if deleting event fails
      }
    } else {
      alert("No user signed in"); // Alert user if no user is signed in
    }
  }

  // JSX markup for the calendar component and event management forms
  return (
    <div className="Cal">
      <div className='Cal-background'></div> {/* Background overlay */}
      <h1>Plot N' Plant</h1> {/* Page title */}
      <p>
        <Link to="/homePage"> {/* Link to home page */}
          <img src="https://cdn1.iconfinder.com/data/icons/icons-for-a-site-1/64/advantage_eco_friendly-128.png" alt="Plant" /> {/* Plant icon */}
        </Link>
      </p>
      <h2>Calendar</h2> {/* Calendar title */}
      {/* Form for adding new event */}
      <div className="addEvent">
        <h2>New Event</h2>
        <form onSubmit={newTodo}>
          <div>
            <input type="datetime-local" id="dateInput" /><br /> {/* Input field for date and time */}
            <input type="text" id="newTodo" placeholder='Crops Planted' className="text-input" /> {/* Input field for event title */}
          </div>
          <button type="submit">Add Event</button> {/* Button to add new event */}
        </form>
      </div>
      <div className="calendar-container"> {/* Container for the calendar component */}
        {loading ? ( // Conditional rendering based on loading state
          <p>Loading...</p> // Display loading message if loading
        ) : (
          <Calendar bordered renderCell={renderCell} /> // Render calendar component with events
        )}
      </div>
      {/* Form for deleting event */}
      <div className='eventBtns'>
        <h2>Delete Event</h2>
        <form onSubmit={(event) => removeEvent(event, document.getElementById("newDelete").value)}>
          <input type="text" id="newDelete" placeholder="Title of event to delete" className="text-input" /> {/* Input field for event title */}
          <button type="submit">Delete Event</button> {/* Button to delete event */}
        </form>
      </div>
    </div>
  );
}

export default Cal; // Export Cal component as default
