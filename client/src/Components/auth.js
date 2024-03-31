import {auth, googleProvider} from "../Config/firebase";
import {createUserWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth";
import {useState, useEffect} from "react";

export const Auth = () => {
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    
    console.log(auth?.currentUser?.email)

    const signIn = async () => {
        try{
            await createUserWithEmailAndPassword(auth,email,password);
        }catch (err){
            console.error(err);
        }
    }

    const signInWithGoogle = async () => {
        try{
            await signInWithPopup(auth,googleProvider);
        }catch (err){
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
                <input placeholder="Email..." className="text-input" onChange={(e) => setEmail(e.target.value)}/>
                <input placeholder="Password..." className="text-input" onChange={(e) => setPassword(e.target.value)}/>
                <button className="button" onClick={signIn}>Sign In</button>
            </div>
            
            <div>
                <button onClick={signInWithGoogle} className="button">Sign In With Google</button>
            </div>

            <button onClick={logout} className="button">Logout</button>
           
            <div>
                {user ? <p>Current user email: {user.email}</p> : <p>No user signed in.</p>}
            </div>
        
        </div>


    )
};

export default Auth;


