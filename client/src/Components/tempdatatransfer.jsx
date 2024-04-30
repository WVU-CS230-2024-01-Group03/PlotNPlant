import React, { useEffect } from 'react';
import jsonData from './data/january.json'; // Assuming your JSON data is stored in a file named 'data.json' in the same directory
import { db } from "../Config/firebase"; // Import the Firestore instance from your Firebase configuration
import { doc, setDoc, collection, getDocs, deleteDoc} from "firebase/firestore";

const DataParser = () => {
    useEffect(() => {
        Object.keys(jsonData).forEach(async (countyName, index) => {
            try {
                // Extract additional data associated with the county
                const additionalData = jsonData[countyName];

                // Create an object with keys for county data
                const countyData = {
                    name:countyName,
                    ...additionalData // Include additional data
                };
                // Add the county data object to Firestore collection
                await setDoc(doc(db, 'NOAA', 'January', "Counties", countyName), countyData);
                console.log(`County data for ${countyName} uploaded successfully`);
            } catch (error) {
                console.error(`Error uploading county data for ${countyName}:`, error);
            }
        });
    }, []); // Run only once on component mount

    return (
        <div>
            <h2>Data</h2>
            {/* You can render the data however you want */}
        </div>
    );
};

export default DataParser;
