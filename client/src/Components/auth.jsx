import {auth, googleProvider} from "../Config/firebase"; // Importing firebase authentication and Google provider
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth"; // Importing firebase authentication methods
import {useState, useEffect} from "react"; // Importing useState and useEffect hooks from React
import { Link } from 'react-router-dom'; // Importing Link component from React Router
import { useNavigate } from "react-router-dom"; // Importing useNavigate hook from React Router

export const Auth = () => { // Declaring a functional component named Auth
    const [email,setEmail] = useState(""); // State variable for email input field
    const [password, setPassword] = useState(""); // State variable for password input field
    const [user, setUser] = useState(null); // State variable to store user data
    const navigate = useNavigate(); // Accessing navigation functions from React Router
    
    console.log(auth?.currentUser?.email) // Logging the current user's email if available

    const signIn = async (e) => { // Defining an asynchronous function signIn
        e.preventDefault(); // Preventing default behavior of the event
        if (!email || !password) { // Checking if email or password is empty
            alert("Email and password are required."); // Alerting user if email or password is empty
            return; // Returning if email or password is empty
        }
        try {
            const userCredentials = await signInWithEmailAndPassword(auth, email, password); // Signing in with email and password
            const user = userCredentials.user; // Extracting user information from credentials
            if (user) { // Checking if user is found
                navigate('/homepage'); // Redirecting to homepage after successful sign in
            } else {
                alert('Username or password not found. Please try again.'); // Alerting if username or password is not found
            }
        } catch (err) {
            alert('Invalid username or password. Please try again.'); // Alerting if username or password is invalid
        }
    }

    const signInWithGoogle = async () => { // Defining a function signInWithGoogle
        try{
            const userCredentials = await signInWithPopup(auth,googleProvider); // Signing in with Google
            const user = userCredentials.user; // Extracting user information from credentials
            if (user) { // Checking if user is found
                navigate('/homepage'); // Redirecting to homepage after successful sign in
            } else {
                alert('Could not login with google.'); // Alerting if unable to login with Google
            }
        } catch (err) {
            alert('Invalid login. Please try again.'); // Alerting if login with Google is invalid
        }
    }
    const createUser = async () => { // Defining a function createUser
        try {
            await createUserWithEmailAndPassword(auth, email, password); // Creating a new user with email and password
        } catch (err) {
            console.error(err); // Logging error if occurred during user creation
        }
    }
    const logout = async () => { // Defining a function logout
        try{
            await signOut(auth); // Signing out the user
        }catch (err){
            console.error(err); // Logging error if occurred during logout
        }
    }

    useEffect(() => { // Effect hook to update user state when authentication state changes
       const displayUser = auth.onAuthStateChanged(user => { // Setting up a listener to track authentication state changes
        setUser(user); // Updating user state when authentication state changes
       })
       return displayUser; // Returning cleanup function to remove listener when component unmounts
    }, []);

    return ( // Returning JSX to render the component's UI
        <div>
            <h2 className="login-h2">Please Login:</h2> 
            <div>
                <input placeholder="Email..." className="text-input" onChange={(e) => setEmail(e.target.value)} required/> 
                <input type="password" placeholder="Password..." className="text-input" onChange={(e) => setPassword(e.target.value)} required/> 
                <button className="button" onClick={signIn}>Sign In</button> 
            </div>
            
            <div>
                <button onClick={signInWithGoogle} className="button">Sign In With Google</button> 
            </div>

            <div>
                <Link to="/register">
                    <button className="button">Create Account</button> 
                </Link>
            </div>
            <div>
                <Link to="/resetpassword"><button className="button">Reset Password? </button></Link> 
            </div>
        </div>


    )
};

export default Auth; // Exporting the Auth component
