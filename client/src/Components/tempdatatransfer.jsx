import React, { useEffect } from 'react'; // Importing React library and useEffect hook
import jsonData from './data/january.json'; // Importing JSON data from a file named 'january.json' in the './data' directory
import { db } from "../Config/firebase"; // Importing Firestore instance from Firebase configuration
import { doc, setDoc, collection, getDocs, deleteDoc} from "firebase/firestore"; // Importing Firestore methods for document manipulation

const DataParser = () => { // Declaring a functional component named DataParser
    useEffect(() => { // Effect hook to run code on component mount
        Object.keys(jsonData).forEach(async (countyName, index) => { // Looping through keys of JSON data
            try {
                // Extract additional data associated with the county
                const additionalData = jsonData[countyName];

                // Create an object with keys for county data
                const countyData = {
                    name:countyName, // Setting county name
                    ...additionalData // Including additional data
                };
                // Adding the county data object to Firestore collection
                await setDoc(doc(db, 'NOAA', 'January', "Counties", countyName), countyData); // Setting document in Firestore with county data
                console.log(`County data for ${countyName} uploaded successfully`); // Logging successful upload
            } catch (error) {
                console.error(`Error uploading county data for ${countyName}:`, error); // Logging error if upload fails
            }
        });
    }, []); // Run only once on component mount

    return (
        <div>
            <h2>Data</h2> // Rendering a heading for the data section
            {/* You can render the data however you want */}
        </div>
    );
};

export default DataParser; // Exporting the DataParser component as the default export
