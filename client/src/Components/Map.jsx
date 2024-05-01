import React, { useEffect, useState } from 'react';
import { TileLayer, MapContainer, Popup } from "react-leaflet";
import { Marker } from "react-leaflet";
import "./map.css";
import { Link } from 'react-router-dom';
import { db } from "../Config/firebase";
import { getDocs, collection, query, where } from "firebase/firestore";

/**
 * Functional component representing a map displaying markers for different counties.
 */
export default function Map() {
  // State variables to manage selected month, county, county data, and month string
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedCounty, setSelectedCounty] = useState(null);
  const [countyData, setCountyData] = useState([]);
  const [monthString, setMonthString] = useState('No month selected'); 

  useEffect(() => {
    // Fetch data from Firebase when selectedMonth or selectedCounty changes
    const fetchData = async () => {
      if (monthString !== 'No month selected' && selectedCounty) {
        const q = query(collection(db, "NOAA", monthString, "Counties"), where('name', "==", selectedCounty));
        console.log("Query:", q); // Add this line for debugging
        const querySnapshot = await getDocs(q);
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        setCountyData(data);
        console.log("County data:", data); // Log the updated data here
        console.log("County data in state:", countyData); // Log the state immediately after setting it
      }
    };
    fetchData();
  }, [selectedMonth, selectedCounty, monthString]); // Make sure monthString is a dependency

  /**
   * Handles the change event when selecting a month.
   * @param {Object} event - The change event object.
   */
  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  /**
   * Handles the click event on a marker.
   * @param {string} county - The name of the selected county.
   */
  const handleMarkerClick = (county) => {
    setSelectedCounty(county);
    console.log("Selected County: ", selectedCounty);
  };

  /**
   * Handles the form submission to set the month string.
   */
  const handleSubmit = () => {
    const month = selectedMonth.split("-")[1];
    console.log(month);
    switch(month){
      // Set month string based on the selected month
      case "01":
        setMonthString('January');
        break;
      case "02":
        setMonthString('February');
        break;
      case "03":
        setMonthString('March');
        break;
      case "04":
        setMonthString('April');
        break;
      case "05":
        setMonthString('May');
        break;
      case "06":
        setMonthString('June');
        break;
      case "07":
        setMonthString('July');
        break;
      case "08":
        setMonthString('August');
        break;
      case "09":
        setMonthString('September');
        break;
      case "10":
        setMonthString('October');
        break;
      case "11":
        setMonthString('November');
        break;
      case "12":
        setMonthString('December');
        break;
      default:
        setMonthString('No month selected'); // Reset to default if no valid month is selected
        break;
    }
  };
   return (
    <div>
      <h1>Map of West Virginia</h1>
      <MapContainer  className="map" center={[38.797626, -80.454903]} zoom={8}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* Marker for Barbour County */}
        <Marker position={[39.15, -80.04]} eventHandlers={{ click: () => handleMarkerClick("Barbour") }}>
          <Popup>
            <h1 className="popup-header">Barbour County</h1>
          </Popup>
        </Marker>
        
        {/* Marker for Berkeley County */}
        <Marker position={[39.46, -77.98]} eventHandlers={{ click: () => handleMarkerClick("Berkeley") }}>
          <Popup>
            <h1 className="popup-header">Berkeley County</h1>
          </Popup>
        </Marker>

        {/* Marker for Boone County */}
        <Marker position={[38.06, -81.80]} eventHandlers={{ click: () => handleMarkerClick("Boone") }}>
          <Popup>
            <h1 className="popup-header">Boone County</h1>
          </Popup>
        </Marker>

        {/* Marker for Braxton County */}
        <Marker position={[38.67, -80.71]} eventHandlers={{ click: () => handleMarkerClick("Braxton") }}>
          <Popup>
            <h1 className="popup-header">Braxton County</h1>
          </Popup>
        </Marker>

        {/* Marker for Brooke County */}
        <Marker position={[40.28, -80.61]} eventHandlers={{ click: () => handleMarkerClick("Brooke") }}>
          <Popup>
            <h1 className="popup-header">Brooke County</h1>
          </Popup>
        </Marker>
        
        {/* Marker for Cabell County */}
        <Marker position={[38.92, -81.09]} eventHandlers={{ click: () => handleMarkerClick("Cabell") }}>
          <Popup>
            <h1 className="popup-header">Cabell County</h1>
          </Popup>
        </Marker>
        
        {/* Marker for Clay County */}
        <Marker position={[38.47, -81.08]} eventHandlers={{ click: () => handleMarkerClick("Clay") }}>
          <Popup>
            <h1 className="popup-header">Clay County</h1>
          </Popup>
        </Marker>
        
        {/* Marker for Doddridge County */}
        <Marker position={[39.30, -80.78]} eventHandlers={{ click: () => handleMarkerClick("Doddridge") }}>
          <Popup>
            <h1 className="popup-header">Doddridge County</h1>
          </Popup>
        </Marker>
        
        {/* Marker for Fayette County */}
        <Marker position={[38.06, -81.11]} eventHandlers={{ click: () => handleMarkerClick("Fayette") }}>
          <Popup>
            <h1 className="popup-header">Fayette County</h1>
          </Popup>
        </Marker>
        
        {/* Marker for Gilmer County */}
        <Marker position={[38.82, -80.92]} eventHandlers={{ click: () => handleMarkerClick("Gilmer") }}>
          <Popup>
            <h1 className="popup-header">Gilmer County</h1>
          </Popup>
        </Marker>
        
        {/* Marker for Grant County */}
        <Marker position={[39.00, -79.13]} eventHandlers={{ click: () => handleMarkerClick("Grant") }}>
          <Popup>
            <h1 className="popup-header">Grant County</h1>
          </Popup>
        </Marker>
        
        {/* Marker for Greenbrier County */}
        <Marker position={[37.81, -80.43]} eventHandlers={{ click: () => handleMarkerClick("Greenbrier") }}>
          <Popup>
            <h1 className="popup-header">Greenbrier County</h1>
          </Popup>
        </Marker>
        
        {/* Marker for Hampshire County */}
        <Marker position={[39.35, -78.76]} eventHandlers={{ click: () => handleMarkerClick("Hampshire") }}>
          <Popup>
            <h1 className="popup-header">Hampshire County</h1>
          </Popup>
        </Marker>
        
        {/* Marker for Hancock County */}
        <Marker position={[40.51, -80.61]} eventHandlers={{ click: () => handleMarkerClick("Hancock") }}>
          <Popup>
            <h1 className="popup-header">Hancock County</h1>
          </Popup>
        </Marker>
        
        {/* Marker for Hardy County */}
        <Marker position={[39.07, -78.96]} eventHandlers={{ click: () => handleMarkerClick("Hardy") }}>
          <Popup>
            <h1 className="popup-header">Hardy County</h1>
          </Popup>
        </Marker>
        
        {/* Marker for Harrison County */}
        <Marker position={[39.29, -80.32]} eventHandlers={{ click: () => handleMarkerClick("Harrison") }}>
          <Popup>
            <h1 className="popup-header">Harrison County</h1>
          </Popup>
        </Marker>
        
        {/* Marker for Jackson County */}
        <Marker position={[38.82, -81.71]} eventHandlers={{ click: () => handleMarkerClick("Jackson") }}>
          <Popup>
            <h1 className="popup-header">Jackson County</h1>
          </Popup>
        </Marker>
        
        {/* Marker for Jefferson County */}
        <Marker position={[39.27, -77.86]} eventHandlers={{ click: () => handleMarkerClick("Jefferson") }}>
          <Popup>
            <h1 className="popup-header">Jefferson County</h1>
          </Popup>
        </Marker>
        
        {/* Marker for Kanawha County */}
        <Marker position={[38.25, -81.42]} eventHandlers={{ click: () => handleMarkerClick("Kanawha") }}>
          <Popup>
            <h1 className="popup-header">Kanawha County</h1>
          </Popup>
        </Marker>
        
        {/* Marker for Lewis County */}
        <Marker position={[39.04, -80.46]} eventHandlers={{ click: () => handleMarkerClick("Lewis") }}>
          <Popup>
            <h1 className="popup-header">Lewis County</h1>
          </Popup>
        </Marker>
        
        {/* Marker for Lincoln County */}
        <Marker position={[38.28, -82.11]} eventHandlers={{ click: () => handleMarkerClick("Lincoln") }}>
          <Popup>
            <h1 className="popup-header">Lincoln County</h1>
          </Popup>
        </Marker>
        
        {/* Marker for Logan County */}
        <Marker position={[37.85, -81.99]} eventHandlers={{ click: () => handleMarkerClick("Logan") }}>
          <Popup>
            <h1 className="popup-header">Logan County</h1>
          </Popup>
        </Marker>
        
        {/* Marker for Marion County */}
        <Marker position={[39.48, -80.15]} eventHandlers={{ click: () => handleMarkerClick("Marion") }}>
          <Popup>
            <h1 className="popup-header">Marion County</h1>
          </Popup>
        </Marker>
        
        {/* Marker for Marshall County */}
        <Marker position={[39.92, -80.74]} eventHandlers={{ click: () => handleMarkerClick("Marshall") }}>
          <Popup>
            <h1 className="popup-header">Marshall County</h1>
          </Popup>
        </Marker>
        
        {/* Marker for Mason County */}
        <Marker position={[38.85, -82.13]} eventHandlers={{ click: () => handleMarkerClick("Mason") }}>
          <Popup>
            <h1 className="popup-header">Mason County</h1>
          </Popup>
        </Marker>
        
        {/* Marker for McDowell County */}
        <Marker position={[37.45, -81.57]} eventHandlers={{ click: () => handleMarkerClick("McDowell") }}>
          <Popup>
            <h1 className="popup-header">McDowell County</h1>
          </Popup>
        </Marker>
        
        {/* Marker for Mercer County */}
        <Marker position={[37.37, -81.10]} eventHandlers={{ click: () => handleMarkerClick("Mercer") }}>
          <Popup>
            <h1 className="popup-header">Mercer County</h1>
          </Popup>
        </Marker>
        
        {/* Marker for Mineral County */}
        <Marker position={[39.44, -78.98]} eventHandlers={{ click: () => handleMarkerClick("Mineral") }}>
          <Popup>
            <h1 className="popup-header">Mineral County</h1>
          </Popup>
        </Marker>
        
        {/* Marker for Mingo County */}
        <Marker position={[37.67, -82.27]} eventHandlers={{ click: () => handleMarkerClick("Mingo") }}>
          <Popup>
            <h1 className="popup-header">Mingo County</h1>
          </Popup>
        </Marker>
        
        {/* Marker for Monongalia County */}
        <Marker position={[39.64, -79.95]} eventHandlers={{ click: () => handleMarkerClick("Monongalia") }}>
          <Popup>
            <h1 className="popup-header">Monongalia County</h1>
          </Popup>
        </Marker>
        
        {/* Marker for Monroe County */}
        <Marker position={[37.59, -80.54]} eventHandlers={{ click: () => handleMarkerClick("Monroe") }}>
          <Popup>
            <h1 className="popup-header">Monroe County</h1>
          </Popup>
        </Marker>
        
        {/* Marker for Morgan County */}
        <Marker position={[39.62, -78.23]} eventHandlers={{ click: () => handleMarkerClick("Morgan") }}>
          <Popup>
            <h1 className="popup-header">Morgan County</h1>
          </Popup>
        </Marker>
        
        {/* Marker for Nicholas County */}
        <Marker position={[38.28, -80.84]} eventHandlers={{ click: () => handleMarkerClick("Nicholas") }}>
          <Popup>
            <h1 className="popup-header">Nicholas County</h1>
          </Popup>
        </Marker>
        
        {/* Marker for Ohio County */}
        <Marker position={[40.08, -80.70]} eventHandlers={{ click: () => handleMarkerClick("Ohio") }}>
          <Popup>
            <h1 className="popup-header">Ohio County</h1>
          </Popup>
        </Marker>
        
        {/* Marker for Pendleton County */}
        <Marker position={[38.65, -79.33]} eventHandlers={{ click: () => handleMarkerClick("Pendleton") }}>
          <Popup>
            <h1 className="popup-header">Pendleton County</h1>
          </Popup>
        </Marker>
        
        {/* Marker for Pleasants County */}
        <Marker position={[39.40, -81.19]} eventHandlers={{ click: () => handleMarkerClick("Pleasants") }}>
          <Popup>
            <h1 className="popup-header">Pleasants County</h1>
          </Popup>
        </Marker>
        
        {/* Marker for Pocahontas County */}
        <Marker position={[38.22, -80.09]} eventHandlers={{ click: () => handleMarkerClick("Pocahontas") }}>
          <Popup>
            <h1 className="popup-header">Pocahontas County</h1>
          </Popup>
        </Marker>
        
        {/* Marker for Preston County */}
        <Marker position={[39.47, -79.68]} eventHandlers={{ click: () => handleMarkerClick("Preston") }}>
          <Popup>
            <h1 className="popup-header">Preston County</h1>
          </Popup>
        </Marker>
        
        {/* Marker for Putnam County */}
        <Marker position={[38.53, -81.89]} eventHandlers={{ click: () => handleMarkerClick("Putnam") }}>
          <Popup>
            <h1 className="popup-header">Putnam County</h1>
          </Popup>
        </Marker>
        
        {/* Marker for Raleigh County */}
        <Marker position={[37.79, -81.18]} eventHandlers={{ click: () => handleMarkerClick("Raleigh") }}>
          <Popup>
            <h1 className="popup-header">Raleigh County</h1>
          </Popup>
        </Marker>
        
        {/* Marker for Randolph County */}
        <Marker position={[38.92, -79.85]} eventHandlers={{ click: () => handleMarkerClick("Randolph") }}>
          <Popup>
            <h1 className="popup-header">Randolph County</h1>
          </Popup>
        </Marker>
        
        {/* Marker for Ritchie County */}
        <Marker position={[39.21, -81.05]} eventHandlers={{ click: () => handleMarkerClick("Ritchie") }}>
          <Popup>
            <h1 className="popup-header">Ritchie County</h1>
          </Popup>
        </Marker>
        
        {/* Marker for Roane County */}
        <Marker position={[38.80, -81.35]} eventHandlers={{ click: () => handleMarkerClick("Roane") }}>
          <Popup>
            <h1 className="popup-header">Roane County</h1>
          </Popup>
        </Marker>
        
        {/* Marker for Summers County */}
        <Marker position={[37.67, -80.88]} eventHandlers={{ click: () => handleMarkerClick("Summers") }}>
          <Popup>
            <h1 className="popup-header">Summers County</h1>
          </Popup>
        </Marker>
        
        {/* Marker for Taylor County */}
        <Marker position={[39.34, -80.02]} eventHandlers={{ click: () => handleMarkerClick("Taylor") }}>
          <Popup>
            <h1 className="popup-header">Taylor County</h1>
          </Popup>
        </Marker>
        
        {/* Marker for Tucker County */}
        <Marker position={[39.09, -79.68]} eventHandlers={{ click: () => handleMarkerClick("Tucker") }}>
          <Popup>
            <h1 className="popup-header">Tucker County</h1>
          </Popup>
        </Marker>
        
        {/* Marker for Tyler County */}
        <Marker position={[39.49, -80.91]} eventHandlers={{ click: () => handleMarkerClick("Tyler") }}>
          <Popup>
            <h1 className="popup-header">Tyler County</h1>
          </Popup>
        </Marker>
        
        {/* Marker for Upshur County */}
        <Marker position={[38.99, -80.23]} eventHandlers={{ click: () => handleMarkerClick("Upshur") }}>
          <Popup>
            <h1 className="popup-header">Upshur County</h1>
          </Popup>
        </Marker>
        
        {/* Marker for Wayne County */}
        <Marker position={[38.22, -82.44]} eventHandlers={{ click: () => handleMarkerClick("Wayne") }}>
          <Popup>
            <h1 className="popup-header">Wayne County</h1>
          </Popup>
        </Marker>
        
        {/* Marker for Webster County */}
        <Marker position={[38.48, -80.41]} eventHandlers={{ click: () => handleMarkerClick("Webster") }}>
          <Popup>
            <h1 className="popup-header">Webster County</h1>
          </Popup>
        </Marker>
        
        {/* Marker for Wetzel County */}
        <Marker position={[39.66, -80.86]} eventHandlers={{ click: () => handleMarkerClick("Wetzel") }}>
          <Popup>
            <h1 className="popup-header">Wetzel County</h1>
          </Popup>
        </Marker>
        
        {/* Marker for Wirt County */}
        <Marker position={[39.06, -81.40]} eventHandlers={{ click: () => handleMarkerClick("Wirt") }}>
          <Popup>
            <h1 className="popup-header">Wirt County</h1>
          </Popup>
        </Marker>
        
        {/* Marker for Wood County */}
        <Marker position={[39.26, -81.54]} eventHandlers={{ click: () => handleMarkerClick("Wood") }}>
          <Popup>
            <h1 className="popup-header">Wood County</h1>
          </Popup>
        </Marker>
        
        {/* Marker for Wyoming County */}
        <Marker position={[37.63, -81.55]} eventHandlers={{ click: () => handleMarkerClick("Wyoming") }}>
          <Popup>
            <h1 className="popup-header">Wyoming County</h1>
          </Popup>
        </Marker>
      </MapContainer>
      <div className="dateSelect">
        <h1>Date Selection</h1>
        <input type="month" value={selectedMonth} onChange={handleMonthChange}></input>
        <input type="submit" className="button" onClick={handleSubmit}></input>
      </div>
      {selectedCounty && <p>Selected County: {selectedCounty}</p>}
      <div className='dataDisplay'>
        <h2>Data for {selectedCounty} in {monthString}</h2>
        {console.log("County Data:", countyData)} {/* Add this line for debugging */}
        <ul>
          {countyData.length === 0 ? (
            <li>No data available</li>
          ) : (
            countyData.map((item, index) => {
              console.log("Item:", item); // Add this line for debugging
              return (
                <li key={index}>
                  <strong>Average Temperature (F): </strong> {String(item[0]).substring(0, 5)}<br />
                  <br />
                  <strong>Average Precipitation (mm): </strong> {String(item[1]).substring(0, 5)}<br />
                  <br />
                  <strong>Maximum Temperature (F): </strong> {String(item[2]).substring(0, 5)}<br />
                  <br />
                  <strong>Minimum Temperature (F): </strong> {String(item[3]).substring(0, 5)}<br />
                </li>
              );
            })
          )}
        </ul>
      </div>
      <div className='homeButton'>
        <h1><Link to="/homePage">Home Page</Link></h1>
      </div>

    </div>
  );
}
