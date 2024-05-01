import {auth, googleProvider} from "../Config/firebase";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth";
import {useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export const Auth = () => {
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    
    console.log(auth?.currentUser?.email)

    const signIn = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert("Email and password are required.");
            return;
        }
        try {
            const userCredentials = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredentials.user;
            if (user) {
                navigate('/homepage');
            } else {
                alert('Username or password not found. Please try again.');
            }
        } catch (err) {
            alert('Invalid username or password. Please try again.');
        }
    }

    const signInWithGoogle = async () => {
        try{
            const userCredentials = await signInWithPopup(auth,googleProvider);
            const user = userCredentials.user;
            if (user) {
                navigate('/homepage');
            } else {
                alert('Could not login with google.');
            }
        } catch (err) {
            alert('Invalid login. Please try again.');
        }
    }
    const createUser = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (err) {
            console.error(err);
        }
    }
    const logout = async () => {
        try{
            await signOut(auth);
        }catch (err){
            console.error(err);
        }
    }

    useEffect(() => {
       const displayUser = auth.onAuthStateChanged(user => {
        setUser(user);
       })
       return displayUser;
    }, []);

    return (
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

export default Auth;
