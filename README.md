# Plot N' Plant
![657d6b2cc8e1a3349384a53cfd87019e](https://github.com/WVU-CS230-2024-01-Group03/PlotNPlant/assets/143005825/dcd4037e-7b76-4445-bd6a-a701406123ba)


## Introduction and Motivation
Plot N' Plant is a website created for anyone interested in gardening. We collaborated with the National Oceanic and Atmospheric Administration, also known as NOAA, to provide our users with insight about the climate, soil and weather conditions in different counties throughout the state of West Virginia.

## Build Status
Currently we are polishing up the project to make it more appealing to the user.

## Technology and Framework Used
* HTML, CSS and JavaScript
* React.js for front-end development
* Firebase for back-end development
* NOAA API for climate, soil and weather data

## Features
- Interactive Map
  * Users can interact with markers on the state of Wst Virginia to view more detailed information about the climate, soil and weather in the desired county.
- Calendar
  * Users can create custom events on a calendar to track when a certain crop was planted or any other important dates that are useful to save.
- Account Management
  * Users can change their email and password that are linked with their account.
  * Users can delete their account if desired.

## Code Example
Home Page Functionality
```javascript
function Home() {
  const [active, setActive] = useState("");
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <div className="home-top-bar">
        <h1>Plot N' Plant</h1>
        <button onClick={logout} className="btn logout-button">
          Logout
        </button>
        <Link to="/usersettings">
          <button className="btn settings-button">Settings</button>
        </Link>
      </div>
      <div className={`home-container ${active}`}>
        <div
          className="split left"
          onMouseEnter={() => setActive("active-left")}
          onMouseLeave={() => setActive("")}
        >
          <h3>Map</h3>
          <a href="/map" className="map-button">
            Click Here To View Map
          </a>
        </div>
        <div
          className="split right"
          onMouseEnter={() => setActive("active-right")}
          onMouseLeave={() => setActive("")}
        >
          <h3>Calender</h3>
          <a href="/cal" className="calender-button">
            Click Here To View Calender
          </a>
        </div>
      </div>
    </div>
  );
}
```

## Installation
1. Clone the reposistory.
   - 'git clone https://github.com/WVU-CS230-2024-01-Group03/PlotNPlant.git'
2. Navigate to the client folder.
   - cd PlotNPLant
   - cd client
3. Install dependencies.
   - npm install
   - npm i react-leaflet leaflet
   - npm i rsuite
   - npm i react-router-dom
4. Start the server.
   - npm start

## API reference
NOAA API
 - The NOAA API lets us query weather and climate data from NOAA, a national agency that studies and charts weather conditions.
## Contribute
1. Make sure your local repository is up to date with the current one.
   - 'git pull'
3. Create a new branch.
   - 'git checkout -b name-your-branch'
4. Add and commit your changes.
   - 'git add changed-file-name'
   - 'git commit -m "add commit message here."'
5. Push your branch.
   - 'git push'
6. Create a pull request

## Credit
* Simon Dalton
* Ayden Durham
* Elizabeth Hausafus
* Kaleb Helton
* Luke Jandora
* Rae McDonald
* Steven Poripski
* Zachary Taylor
