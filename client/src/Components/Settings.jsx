import {useEffect, useState} from 'react'
import {db} from "../Config/firebase" 
import {getDocs, collection} from "firebase/firestore" 

const Settings = () => {
    const[settings, setSettings] = useState([]);

    const settingsCollectionRef = collection(db, "users");

    useEffect(() => {
        const getSettings = async () => {
            //Read the settings
            //Set the settings
            try{
                const data = await getDocs(settingsCollectionRef);
                const filteredData = data.docs.map((doc) => ({
                    ...doc.data(),
                     id: doc.id,
                    }));
                setSettings(filteredData);
            }catch (err){
                console.error(err);
            }
            
        }
        getSettings();
    }, []);

    return(
        <div>
            <h1>Settings</h1>
            <div>
                {settings.map((setting) => (
                    <div>
                        <p>Location: {setting.location}</p>
                        <p>Soil: {setting.soil}</p>
                    </div>
                ))}
            </div>

        </div>

    )

}

export default Settings;